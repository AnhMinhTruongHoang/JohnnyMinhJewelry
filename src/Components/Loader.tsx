"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function FullScreenLoader() {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setDisplayProgress((prev) =>
      Math.min(100, Math.max(prev, Math.round(progress))),
    );

    if (progress >= 100) {
      const timeout = setTimeout(() => setShow(false), 550);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#f7f0e6] px-4"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,168,79,0.22),transparent_34%),linear-gradient(180deg,#fff8ed_0%,#f7f0e6_45%,#eadfce_100%)]" />

      <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6a84f]/15 blur-3xl sm:h-[420px] sm:w-[420px]" />

      <div className="relative flex w-full max-w-[360px] flex-col items-center rounded-[28px] border border-[#d6a84f]/25 bg-white/45 px-6 py-8 text-center shadow-[0_24px_80px_rgba(62,39,20,0.18)] backdrop-blur-md sm:max-w-[430px] sm:px-8 sm:py-10">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#d6a84f]/35 bg-[#fffaf2] shadow-inner sm:h-16 sm:w-16">
          <span className="font-serif text-2xl font-bold italic text-[#5e2d2d] sm:text-3xl">
            JM
          </span>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b7540] sm:text-sm">
          JohnnyMinh Jewelry
        </p>

        <h2 className="mt-3 font-serif text-3xl font-bold italic leading-tight text-[#5e2d2d] sm:text-4xl">
          Loading Studio
        </h2>

        <p className="mt-3 max-w-[280px] text-sm leading-6 text-[#7b6a58] sm:text-base">
          Preparing your 3D jewelry experience...
        </p>

        <div className="mt-7 w-full">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-[#6f5b48]">
            <span>Progress</span>
            <span>{displayProgress}%</span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#d8c8b0]">
            <div
              className="h-full rounded-full bg-[#5e2d2d] transition-all duration-300 ease-out"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs font-medium text-[#8a7968]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#5e2d2d]" />
          <span>Please wait a moment</span>
        </div>
      </div>
    </div>
  );
}