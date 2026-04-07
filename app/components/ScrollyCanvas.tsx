"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 240;

interface ScrollyCanvasProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  onLoaded?: (progress: number) => void;
  onProgress?: (progress: number) => void;
}

export default function ScrollyCanvas({ containerRef, onLoaded, onProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Map scroll progress (0 to 1) to frame index (1 to FRAME_COUNT)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      const frameNumber = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${frameNumber}.png`;
      img.onload = () => {
        loadedCount++;
        // Report progress (0–100)
        const progress = Math.round((loadedCount / FRAME_COUNT) * 100);
        onProgress?.(progress);
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
          onLoaded?.(100);
        }
      };
      img.onerror = () => {
        // Count failures too so we don't stall
        loadedCount++;
        const progress = Math.round((loadedCount / FRAME_COUNT) * 100);
        onProgress?.(progress);
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
          onLoaded?.(100);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const renderFrame = (index: number) => {
    if (!loaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index - 1];
    if (!img) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        let index = Math.round(frameIndex.get());
        if (isNaN(index) || index < 1) index = 1;
        if (index > FRAME_COUNT) index = FRAME_COUNT;
        renderFrame(index);
      }
    };
    window.addEventListener("resize", handleResize);
    setTimeout(handleResize, 50);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, images]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(() => renderFrame(Math.round(latest)));
  });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Shimmer skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 shimmer" />
      )}
      <canvas
        ref={canvasRef}
        className="block w-full h-screen object-cover"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
      />
    </div>
  );
}
