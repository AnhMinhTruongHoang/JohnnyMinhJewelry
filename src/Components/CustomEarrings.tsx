"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import useMaterial from "./Material.Hard";

useGLTF.preload("/Models/earrings/earrings001.glb");

type CustomEarringsModelProps = {
  scale?: number;
  materialMapping?: Record<
    string,
    "gold" | "silver" | "ceramic" | "diamond" | "wood" | "metal"
  >;
};

export default function CustomEarringsModel({
  scale = 1,
  materialMapping = {},
}: CustomEarringsModelProps) {
  const { scene } = useGLTF("/Models/earrings/earrings001.glb");

  // Materials
  const goldMat = useMaterial({ type: "gold" });
  const silverMat = useMaterial({ type: "silver" });
  const ceramicMat = useMaterial({ type: "ceramic" });
  const diamondMat = useMaterial({ type: "diamond" });
  const woodMat = useMaterial({ type: "wood" });
  const metalMat = useMaterial({ type: "metal" });

  const materialCache = useMemo(
    () => ({
      gold: goldMat,
      silver: silverMat,
      ceramic: ceramicMat,
      diamond: diamondMat,
      wood: woodMat,
      metal: metalMat,
    }),
    [goldMat, silverMat, ceramicMat, diamondMat, woodMat, metalMat],
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
      {/* Earrings */}
      <primitive
        object={scene}
        onPointerOver={() => (document.body.style.cursor = "grab")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      />
    </group>
  );
}
