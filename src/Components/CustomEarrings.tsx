"use client";
import { useGLTF } from "@react-three/drei";
import {
  forwardRef,
  useEffect,
  useMemo,
  useImperativeHandle,
  useRef,
} from "react";
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

// API cho parent
export type CustomEarringsModelHandle = {
  getScene: () => THREE.Group;
  resetMaterials: (mapping?: Record<string, MaterialType>) => void;
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

const CustomEarringsModel = forwardRef<CustomEarringsModelHandle, Props>(
  ({ scale = 1, rotation = [0, 0, 0], materialMapping }, ref) => {
    const { scene } = useGLTF("/Models/earrings/Earrings001.glb");
    const groupRef = useRef<THREE.Group>(null);

    // Tạo materials cache
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

    // Hàm apply materials
    const applyMaterials = (mapping: Record<string, MaterialType>) => {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          for (const [partName, meshNames] of Object.entries(partToMeshes)) {
            if (meshNames.includes(child.name)) {
              const matKey = mapping[partName];
              if (matKey && materials[matKey]) {
                child.material = materials[matKey];
              } else if (child.userData.originalMaterial) {
                child.material = child.userData.originalMaterial;
              }
            }
          }
        }
      });
    };

    // Lưu material gốc lần đầu
    useEffect(() => {
      scene.traverse((child: any) => {
        if (child.isMesh && !child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material;
        }
      });
    }, [scene]);

    // Update khi mapping thay đổi
    useEffect(() => {
      if (scene) applyMaterials(materialMapping);
    }, [materialMapping, scene, materials]);

    // expose API cho parent
    useImperativeHandle(ref, () => ({
      getScene: () => groupRef.current || (scene as THREE.Group),
      resetMaterials: (mapping?: Record<string, MaterialType>) => {
        applyMaterials(mapping ?? materialMapping);
      },
    }));

    return (
      <primitive
        ref={groupRef}
        object={scene}
        scale={scale}
        rotation={rotation}
      />
    );
  },
);

CustomEarringsModel.displayName = "CustomEarringsModel";
export default CustomEarringsModel;
