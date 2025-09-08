"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function FullScreenLoader() {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setDisplayProgress((prev) => Math.max(prev, progress));

    if (progress === 100) {
      const timeout = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <span className="text-lg font-semibold text-[#5e2d2d]">Loading...</span>
      <span className="mt-2 text-gray-600">{displayProgress.toFixed(0)}%</span>
    </div>
  );
}
