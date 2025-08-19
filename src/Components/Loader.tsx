"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function FullScreenLoader() {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      // delay 100ms để tránh flicker
      const timeout = setTimeout(() => setShow(false), 50);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <span className="text-lg font-semibold text-[#5e2d2d]">Loading...</span>
      <span className="mt-2 text-gray-600">{progress.toFixed(0)}%</span>
    </div>
  );
}
