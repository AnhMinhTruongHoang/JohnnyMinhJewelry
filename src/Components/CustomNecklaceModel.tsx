"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import useMaterial from "./Material";

useGLTF.preload("/Models/necklace/Necklace01.glb");

type CustomNecklaceModelProps = {
  scale?: number;
  materialMapping?: Record<
    string,
    "gold" | "silver" | "ceramic" | "diamond" | "wood" | "metal"
  >;
};

export default function CustomNecklaceModel({
  scale = 1,
  materialMapping = {},
}: CustomNecklaceModelProps) {
  const { scene } = useGLTF("/Models/necklace/Necklace01.glb");

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

  /// check mesh

  // useMemo(() => {
  //   if (!scene) return;

  //   const meshNames: string[] = [];

  //   scene.traverse((child: any) => {
  //     if (child.isMesh) {
  //       meshNames.push(child.name);
  //     }
  //   });

  //   console.log("📦 Meshes in scene:");
  //   meshNames.forEach((name, index) => {
  //     console.log(`  ${index + 1}. ${name}`);
  //   });
  // }, [scene]);

  ///

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
