"use client";

import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import FloatingRing from "@/Components/floating.ring";
import { useFrame } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {};

export default function Scene({}: Props) {
  const RingRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (RingRef.current) {
      RingRef.current.position.y = Math.sin(t) * 0.1; // float lên xuống
    }
  });

  return (
    <group
      ref={RingRef}
      position-x={-1}
      position-y={1} // 👈 lên/xuống
      position-z={0} // 👈 ra trước / lùi sau camera
      // 👉 Góc xoay ban đầu (radian):
      rotation-y={0.3} // 👈 xoay qua trái/phải
      rotation-x={0} // 👈 ngửa lên/xuống
      rotation-z={0.5} // 👈 xoay nghiêng
      // 👉 Scale toàn bộ group:
      scale={1.2} // 👈 tăng lên 2.0 cho to hơn
    >
      <FloatingRing scale={6} />
      <Environment files={"/HDR/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
}
