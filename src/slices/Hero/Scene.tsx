"use client";

import { Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

import FloatingRing from "@/Components/floating.ring";

export default function Scene() {
  const ringRef = useRef<Group>(null);
  const { size } = useThree();

  const isMobile = size.width < 768;

  // ==========================================
  // MOBILE - CHỈNH 3 DÒNG NÀY
  // ==========================================

  const mobilePosition: [number, number, number] = [
    0, // X: trái/phải
    0.15, // Y: lên/xuống
    0, // Z: gần/xa
  ];

  const mobileRotation: [number, number, number] = [
    1.15, // X: ngửa/cúi
    0.15, // Y: quay trái/phải
    0.05, // Z: nghiêng
  ];

  const mobileScale = 0.9;

  // ==========================================
  // DESKTOP - CHỈNH 3 DÒNG NÀY
  // ==========================================

  const desktopPosition: [number, number, number] = [
    0.2, // X
    0, // Y
    0, // Z
  ];

  const desktopRotation: [number, number, number] = [
    0.45, // X
    0.9, // Y
    -0.35, // Z
  ];

  const desktopScale = 1.5;

  // ==========================================

  const position = isMobile ? mobilePosition : desktopPosition;

  const rotation = isMobile ? mobileRotation : desktopRotation;

  const scale = isMobile ? mobileScale : desktopScale;

  useFrame(({ clock }) => {
    if (!ringRef.current) return;

    const t = clock.getElapsedTime();

    // chỉ floating lên xuống
    ringRef.current.position.y = position[1] + Math.sin(t) * 0.03;
  });

  return (
    <group ref={ringRef} position={position} rotation={rotation} scale={scale}>
      <FloatingRing
        scale={6}
        floatSpeed={0.8}
        rotationIntensity={0}
        floatIntensity={0.05}
      />

      <Environment files="/HDR/lobby.hdr" environmentIntensity={1.8} />
    </group>
  );
}
