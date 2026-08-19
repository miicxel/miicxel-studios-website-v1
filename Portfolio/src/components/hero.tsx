"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { VideoMonitor } from "@/components/video-monitor";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 md:pt-36 md:pb-24">
      <div className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-10 lg:gap-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Image
              src="/logos/brandmark.png"
              alt="Miicxel Studios wordmark"
              width={280}
              height={280}
              priority
              className="h-10 w-auto opacity-90"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
            className="mt-8 max-w-xl text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.025em] text-[#f2f1f5] sm:text-[3.2rem] md:text-[3.6rem]"
          >
            Your long-form talk, turned into clips that perform.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
            className="mt-6 max-w-[56ch] text-[15px] leading-relaxed text-[#8e8c99] md:text-base"
          >
            We cut podcasts, calls, webinars, and talks into short-form video.
            You get Shorts, Reels, and TikToks ready to post.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="rounded-md border border-[#232228] bg-[#16161b] px-5 py-2.5 text-[14px] font-semibold text-[#f2f1f5] transition-colors duration-200 ease-out hover:border-[#7c3aed] hover:text-[#9061f9] focus-visible:ring-2 focus-visible:ring-[#9061f9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0e]"
            >
              View work
            </a>
            <a
              href="#start"
              className="rounded-md bg-[#7c3aed] px-5 py-2.5 text-[14px] font-semibold text-[#f2f1f5] transition-colors duration-200 ease-out hover:bg-[#9061f9] focus-visible:ring-2 focus-visible:ring-[#9061f9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0e]"
            >
              Get a quote
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.38 }}
            className="timecode mt-10 text-[10px] text-[#817f95]"
          >
            COACHES · CONSULTANTS · COURSE CREATORS · PERSONAL BRANDS
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, clipPath: "inset(12% 6% 12% 6%)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          className="justify-self-center w-full max-w-[300px] md:max-w-[320px]"
        >
          <VideoMonitor
            src="/videos/hero-demo.mp4"
            filename="hero-demo.mp4"
            duration="00:08"
            autoPlay
            ariaLabel="Hero clip preview"
          />
        </motion.div>
      </div>

      <p className="timecode mt-14 flex items-center gap-2 text-[10px] text-[#817f95] md:mt-20">
        <span className="h-px w-8 bg-[#7c3aed]" />
        SCROLL TO ADVANCE THE REEL
      </p>
    </section>
  );
}
