"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const DreiLoader = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Loader),
  { ssr: false },
);

export default function ViewCanvas() {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100dvh",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 10,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
        camera={{
          fov: 32,
          position: [0, 0, 5],
        }}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>

      <DreiLoader />
    </>
  );
}
