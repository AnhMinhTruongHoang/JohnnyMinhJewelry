"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import useMaterial from "./Material.Hard";
import useSoftMaterial from "./Material.Soft";

useGLTF.preload("/Models/necklace/Necklace01.glb");

type CustomNecklaceModelProps = {
  scale?: number;
  materialMapping?: Record<
    string,
    | "gold"
    | "silver"
    | "ceramic"
    | "diamond"
    | "wood"
    | "metal"
    | "cotton"
    | "linen"
    | "silk"
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
  ///soft Material
  const linenMat = useSoftMaterial({ type: "linen" });
  const cottonMat = useSoftMaterial({ type: "cotton" });
  const silkMat = useSoftMaterial({ type: "silk" });

  const materialCache = useMemo(
    () => ({
      gold: goldMat,
      silver: silverMat,
      ceramic: ceramicMat,
      diamond: diamondMat,
      wood: woodMat,
      metal: metalMat,
      linen: linenMat,
      cotton: cottonMat,
      silk: silkMat,
    }),
    [
      goldMat,
      silverMat,
      ceramicMat,
      diamondMat,
      woodMat,
      metalMat,
      linenMat,
      cottonMat,
      silkMat,
    ],
  );

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child: any) => {
      if (child.isMesh) {
        // console.log("Mesh:", child.name);
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
