"use client";

import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import FloatingNecklace from "@/Components/floating.Necklace";

type Props = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

export default function SceneNecklace({
  position = [0.35, 0, 1],
  rotation = [0, -2, 0],
  scale = 1,
}: Props) {
  const necklaceRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (necklaceRef.current) {
      necklaceRef.current.position.y = position[1] + Math.sin(t) * 0.1;
    }
  });

  return (
    <group
      ref={necklaceRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <FloatingNecklace scale={6} />
      <Environment files={"/HDR/lobby.hdr"} environmentIntensity={2} />
    </group>
  );
}
