"use client";

import { Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

import FloatingNecklace from "@/Components/floating.Necklace";

export default function SceneNecklace() {
  const necklaceRef = useRef<Group>(null);
  const { size } = useThree();

  const isMobile = size.width < 768;

  // Keep it centered on mobile. The previous x=0.58 pushed an already
  // off-center GLB even farther outside the right side of the viewport.
  const basePosition: [number, number, number] = isMobile
    ? [0, 0.7, 0]
    : [0.55, 0, 0];

  const rotation: [number, number, number] = isMobile
    ? [0.04, -1.72, 0.06]
    : [0, -2, 0];

  // Necklace is much longer than the ring, so use a smaller mobile scale.
  const responsiveScale = isMobile ? 0.3 : 0.75;

  useFrame(({ clock }) => {
    if (!necklaceRef.current) return;

    const t = clock.getElapsedTime();
    necklaceRef.current.position.y =
      basePosition[1] + Math.sin(t * 0.8) * (isMobile ? 0.02 : 0.05);
  });

  return (
    <group
      ref={necklaceRef}
      position={basePosition}
      rotation={rotation}
      scale={responsiveScale}
    >
      <FloatingNecklace
        scale={6}
        floatSpeed={0.8}
        rotationIntensity={0.035}
        floatIntensity={0.08}
        floatingRange={[-0.02, 0.02]}
      />

      <Environment files="/HDR/lobby.hdr" environmentIntensity={1.8} />
    </group>
  );
}
