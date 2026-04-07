import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Shakthi Sharaan C — Creative Developer & AI Engineer",
  description: "Cinematic personal portfolio of Shakthi Sharaan C — a Creative Developer & AI Engineer building intelligent digital experiences at the intersection of AI, design, and engineering.",
  keywords: ["Shakthi Sharaan", "portfolio", "AI Engineer", "Creative Developer", "Next.js", "React", "LangChain"],
  authors: [{ name: "Shakthi Sharaan C" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shakthi-sharaan.vercel.app",
    title: "Shakthi Sharaan C — Creative Developer & AI Engineer",
    description: "Building intelligent digital experiences at the intersection of AI, design, and engineering.",
    siteName: "Shakthi Sharaan C Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shakthi Sharaan C — Creative Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shakthi Sharaan C — Creative Developer & AI Engineer",
    description: "Building intelligent digital experiences at the intersection of AI, design, and engineering.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased text-white bg-black`}>
        {children}
      </body>
    </html>
  );
}
