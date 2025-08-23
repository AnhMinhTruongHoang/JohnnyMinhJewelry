"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import useRingMaterial from "./Material";

useGLTF.preload("/Models/rings/source/RING_custom.glb");

type CustomRingModelProps = {
  scale?: number;
  materialMapping?: Record<string, "gold" | "silver" | "ceramic" | "diamond">;
};

export default function CustomRingModel({
  scale = 1,
  materialMapping = {},
}: CustomRingModelProps) {
  const { scene } = useGLTF("/Models/rings/source/RING_custom.glb");

  // Materials
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

  return (
    <group scale={scale}>
      {/* Ring */}
      <primitive
        object={scene}
        onPointerOver={() => (document.body.style.cursor = "grab")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      />
    </group>
  );
}
