"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import useRingMaterial from "./RingMaterial";

type CustomRingModelProps = {
  scale?: number;
  materialType?: "gold" | "silver" | "ceramic";
};

export default function CustomRingModel({
  scale = 1.2,
  materialType = "gold",
}: CustomRingModelProps) {
  const { scene } = useGLTF("/Models/rings/source/RING_custom.glb");
  const material = useRingMaterial({ type: materialType });

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  }, [scene, material]);

  return <primitive object={scene} scale={scale} />;
}
