"use client";
import {
  TextureLoader,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
} from "three";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";

type RingMaterialProps = {
  type?: "gold" | "silver" | "ceramic" | "diamond";
};

export default function useRingMaterial({ type = "gold" }: RingMaterialProps) {
  const texturePaths = {
    gold: {
      base: "/Models/rings/textures/gold/Poliigon_MetalGoldPaint_7253_BaseColor.jpg",
      normal:
        "/Models/rings/textures/gold/Poliigon_MetalGoldPaint_7253_Normal.png",
      roughness:
        "/Models/rings/textures/gold/Poliigon_MetalGoldPaint_7253_Roughness.jpg",
      metalness:
        "/Models/rings/textures/gold/Poliigon_MetalGoldPaint_7253_Metallic.jpg",
    },
    silver: {
      base: "/Models/rings/textures/silver/Poliigon_MetalSteelBrushed_7174_BaseColor.jpg",
      normal:
        "/Models/rings/textures/silver/Poliigon_MetalSteelBrushed_7174_Normal.png",
      roughness:
        "/Models/rings/textures/silver/Poliigon_MetalSteelBrushed_7174_Roughness.jpg",
      metalness:
        "/Models/rings/textures/silver/Poliigon_MetalSteelBrushed_7174_Metallic.jpg",
    },
    ceramic: {
      base: "/Models/rings/textures/ceramic/Poliigon_ClayCeramicGlossy_5212_BaseColor.jpg",
      normal:
        "/Models/rings/textures/ceramic/Poliigon_ClayCeramicGlossy_5212_Normal.png",
      roughness:
        "/Models/rings/textures/ceramic/Poliigon_ClayCeramicGlossy_5212_Roughness.jpg",
      metalness:
        "/Models/rings/textures/ceramic/Poliigon_ClayCeramicGlossy_5212_Metallic.jpg",
    },
    diamond: {
      base: "/Models/rings/textures/diamond/Image_0_2@channels=G.jpeg",
      normal: "/Models/rings/textures/diamond/Image_1_0.jpeg",
      roughness: "/Models/rings/textures/diamond/Image_1_1.png",
      metalness:
        "/Models/rings/textures/silver/Poliigon_MetalSteelBrushed_7174_Metallic.jpg",
    },
  };

  const [base, normal, roughness, metalness] = useLoader(TextureLoader, [
    texturePaths[type].base,
    texturePaths[type].normal,
    texturePaths[type].roughness,
    texturePaths[type].metalness,
  ]);

  return useMemo(() => {
    if (type === "diamond") {
      return new MeshPhysicalMaterial({
        map: base,
        normalMap: normal,
        roughnessMap: roughness,
        metalnessMap: metalness,
        transparent: true,
        transmission: 0.95, // độ xuyên sáng (gần như trong suốt)
        ior: 2.4, // chiết suất kim cương
        thickness: 0.5,
        roughness: 0,
        metalness: 0,
      });
    }

    return new MeshStandardMaterial({
      map: base,
      normalMap: normal,
      roughnessMap: roughness,
      metalnessMap: metalness,
      metalness: type === "ceramic" ? 0 : 1,
      roughness: type === "ceramic" ? 0.4 : 0.15,
    });
  }, [type, base, normal, roughness, metalness]);
}
