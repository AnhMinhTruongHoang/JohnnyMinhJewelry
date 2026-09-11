"use client";

import { Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";

import FloatingRing from "@/Components/floating.ring";

export default function Scene() {
  const ringRef = useRef<Group>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setIsMobile(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  // =========================
  // MOBILE
  // =========================

  const mobilePosition: [number, number, number] = [0, 0, 3];

  const mobileRotation: [number, number, number] = [0, 0.15, 0.05];

  const mobileScale = 0.9;

  // =========================
  // DESKTOP
  // =========================

  const desktopPosition: [number, number, number] = [0, 0, 1.5];

  const desktopRotation: [number, number, number] = [6, 0.1, -1];

  const desktopScale = 1.5;

  // =========================

  const basePosition = isMobile ? mobilePosition : desktopPosition;

  const baseRotation = isMobile ? mobileRotation : desktopRotation;

  const baseScale = isMobile ? mobileScale : desktopScale;

  useFrame(({ clock }) => {
    if (!ringRef.current) return;

    const t = clock.getElapsedTime();

    // FLOAT LÊN XUỐNG
    ringRef.current.position.y = basePosition[1] + Math.sin(t * 1.2) * 0.06;

    // XOAY RẤT NHẸ
    ringRef.current.rotation.x = baseRotation[0] + Math.sin(t * 0.35) * 0.03;

    ringRef.current.rotation.y = baseRotation[1] + Math.sin(t * 0.45) * 0.05;

    ringRef.current.rotation.z = baseRotation[2];
  });

  return (
    <group
      ref={ringRef}
      position={basePosition}
      rotation={baseRotation}
      scale={baseScale}
    >
      <FloatingRing
        scale={6}
        floatSpeed={1.2}
        rotationIntensity={0.15}
        floatIntensity={0.35}
        floatingRange={[-0.05, 0.05]}
      />

      <Environment files="/HDR/lobby.hdr" environmentIntensity={1.8} />
    </group>
  );
}
