"use client";
import { useEffect, useRef } from "react";
import { Group } from "three";
import RingModel from "@/Components/ring";
import useRingMaterial from "@/Components/RingMaterial";

type CustomRingProps = {
  materialType?: "gold" | "silver" | "ceramic";
  scale?: number;
};

export default function CustomRing({
  materialType = "gold",
  scale = 1.2,
}: CustomRingProps) {
  const ref = useRef<Group>(null);
  const material = useRingMaterial({ type: materialType });

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse((child: any) => {
        if (child.isMesh) {
          child.material = material;
        }
      });
    }
  }, [material]);

  return (
    <group ref={ref} scale={scale}>
      <RingModel />
    </group>
  );
}
