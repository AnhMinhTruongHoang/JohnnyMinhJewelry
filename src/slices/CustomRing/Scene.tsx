"use client";

import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import CustomRingModel from "@/Components/CustomRingModel";
import EngravingText from "@/Components/EngravingText";

type Props = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

export default function SceneCustomRing({
  position = [-0.75, 0, 1],
  rotation = [0, 0.3, 0.5],
  scale = 1,
}: Props) {
  const ringRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.position.y = position[1] + Math.sin(t) * 0.1;
    }
  });

  return (
    <group ref={ringRef} position={position} rotation={rotation} scale={scale}>
      <CustomRingModel scale={6} />
      <EngravingText
        text="MINH ANH"
        position={[0, 0.3, 1]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Environment files={"/HDR/lobby.hdr"} environmentIntensity={3} />
    </group>
  );
}
