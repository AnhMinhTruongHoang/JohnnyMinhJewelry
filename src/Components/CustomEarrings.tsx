"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

type MaterialType =
  | "gold"
  | "silver"
  | "ceramic"
  | "diamond"
  | "metal"
  | "wood";

type Props = {
  scale?: number;
  rotation?: [number, number, number];
  materialMapping: Record<string, MaterialType>;
};

const partToMeshes: Record<string, string[]> = {
  diamond: [
    "Diamond_main_gemStone_topaz_blue_0002",
    "Diamond_main_gemStone_topaz_blue_0002_1",
  ],
  diamondSmall: [
    "Diamond_small000(0)001_gemStone_topaz_white_0002",
    "Diamond_small000(0)001_gemStone_topaz_white_0002_1",
  ],
  holders: ["holders"],
  pillow: ["pillow"],
};

export default function CustomEarringsModel({
  scale = 1,
  rotation = [0, 0, 0],
  materialMapping,
}: Props) {
  const { scene } = useGLTF("/Models/earrings/Earrings001.glb");

  // Tạo materials 1 lần
  const materials = useMemo(
    () => ({
      gold: new THREE.MeshStandardMaterial({
        color: "#FFD700",
        metalness: 1,
        roughness: 0.2,
      }),
      silver: new THREE.MeshStandardMaterial({
        color: "#C0C0C0",
        metalness: 1,
        roughness: 0.3,
      }),
      ceramic: new THREE.MeshStandardMaterial({
        color: "#E0E0E0",
        roughness: 0.8,
      }),
      diamond: new THREE.MeshPhysicalMaterial({
        color: "#FFFFFF",
        metalness: 0,
        roughness: 0,
        transmission: 1,
        thickness: 0.5,
        ior: 2.4,
      }),
      metal: new THREE.MeshStandardMaterial({
        color: "#888888",
        metalness: 1,
        roughness: 0.4,
      }),
      wood: new THREE.MeshStandardMaterial({
        color: "#8B4513",
        roughness: 0.7,
      }),
    }),
    [],
  );

  // Áp dụng material
  useEffect(() => {
    if (!scene) return;

    // Lưu material gốc vào userData của mesh
    scene.traverse((child: any) => {
      if (child.isMesh && !child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material;
      }
    });

    // Áp dụng material mới nếu có mapping
    scene.traverse((child: any) => {
      if (child.isMesh) {
        for (const [partName, meshNames] of Object.entries(partToMeshes)) {
          if (meshNames.includes(child.name)) {
            const matKey = materialMapping[partName];
            if (matKey && materials[matKey]) {
              child.material = materials[matKey];
            } else {
              child.material = child.userData.originalMaterial;
            }
          }
        }
      }
    });
  }, [materialMapping, scene, materials]);

  return <primitive object={scene} scale={scale} rotation={rotation} />;
}
