import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { DirectionContract } from "@/components/direction-contract";
import { Nav } from "@/components/nav";
import { ScrollScrubber } from "@/components/scroll-scrubber";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Short-Form Video Repurposing for Coaches and Consultants | Miicxel Studios",
  description:
    "Short-form video editing and content repurposing for coaches and consultants. Turn podcasts, calls, webinars, and talks into Shorts, Reels, and TikToks ready to post.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-background text-foreground font-sans">
        <DirectionContract />
        <MotionConfig reducedMotion="user">
          <ScrollScrubber />
          <Nav />
          <main className="relative">{children}</main>
        </MotionConfig>
      </body>
    </html>
  );
}
