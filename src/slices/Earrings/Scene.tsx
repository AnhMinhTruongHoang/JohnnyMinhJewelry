"use client";

import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import CustomEarringsModel from "@/Components/CustomEarrings";

type Props = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

export default function SceneCustomEarrings({
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
      <CustomEarringsModel scale={6} />
    </group>
  );
}
