"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import useRingMaterial from "./RingMaterial";

useGLTF.preload("/Models/rings/source/RING_custom.glb");

type CustomRingModelProps = {
  scale?: number;
  materialMapping?: Record<string, "gold" | "silver" | "ceramic" | "diamond">;
};

export default function CustomRingModel({
  scale = 1.2,
  materialMapping = {},
}: CustomRingModelProps) {
  const { scene } = useGLTF("/Models/rings/source/RING_custom.glb");

  // Gọi từng hook useRingMaterial riêng biệt ở top-level
  const goldMat = useRingMaterial({ type: "gold" });
  const silverMat = useRingMaterial({ type: "silver" });
  const ceramicMat = useRingMaterial({ type: "ceramic" });
  const diamondMat = useRingMaterial({ type: "diamond" });

  const materialCache = useMemo(
    () => ({
      gold: goldMat,
      silver: silverMat,
      ceramic: ceramicMat,
      diamond: diamondMat,
    }),
    [goldMat, silverMat, ceramicMat, diamondMat],
  );

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child: any) => {
      if (child.isMesh) {
        const matType = materialMapping[child.name];
        if (matType) {
          child.material = materialCache[matType];
        }
      }
    });
  }, [scene, materialMapping, materialCache]);

  return <primitive object={scene} scale={scale} />;
}
