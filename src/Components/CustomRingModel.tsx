"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import useRingMaterial from "./RingMaterial";

useGLTF.preload("/Models/rings/source/RING_custom.glb");

type CustomRingModelProps = {
  scale?: number;
  materialMapping: Record<string, "gold" | "silver" | "ceramic" | "diamond">;
};

export default function CustomRingModel({
  scale = 1.2,
  materialMapping,
}: CustomRingModelProps) {
  const { scene } = useGLTF("/Models/rings/source/RING_custom.glb");

  // tạo trước materials cần dùng
  const materials = useMemo(() => {
    const mats: Record<string, any> = {};
    Object.values(materialMapping).forEach((type) => {
      if (!mats[type]) {
        mats[type] = useRingMaterial({ type });
      }
    });
    return mats;
  }, [materialMapping]);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child: any) => {
      if (child.isMesh) {
        const type = materialMapping[child.name];
        if (type && materials[type]) {
          child.material = materials[type];
        }
      }
    });
  }, [scene, materialMapping, materials]);

  return <primitive object={scene} scale={scale} />;
}
