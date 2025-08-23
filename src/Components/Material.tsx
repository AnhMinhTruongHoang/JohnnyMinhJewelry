"use client";
import {
  TextureLoader,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
} from "three";
import { useLoader } from "@react-three/fiber";
import { useMemo, useEffect } from "react";

type MaterialType =
  | "gold"
  | "silver"
  | "ceramic"
  | "diamond"
  | "wood"
  | "metal";

type MaterialProps = {
  type?: MaterialType;
};

const TEXTURE_PATHS: Record<
  MaterialType,
  { base: string; normal: string; roughness: string; metalness: string }
> = {
  gold: {
    base: "/textures/gold/Poliigon_MetalGoldPaint_7253_BaseColor.jpg",
    normal: "/textures/gold/Poliigon_MetalGoldPaint_7253_Normal.png",
    roughness: "/textures/gold/Poliigon_MetalGoldPaint_7253_Roughness.jpg",
    metalness: "/textures/gold/Poliigon_MetalGoldPaint_7253_Metallic.jpg",
  },
  silver: {
    base: "/textures/silver/Metal049C_1K-PNG_Color.png",
    normal: "/textures/silver/Metal049C_1K-PNG_NormalDX.png",
    roughness: "/textures/silver/Metal049C_1K-PNG_Roughness.png",
    metalness: "/textures/silver/Metal049C_1K-PNG_Metalness.png",
  },
  ceramic: {
    base: "/textures/ceramic/Poliigon_ClayCeramicGlossy_5212_BaseColor.jpg",
    normal: "/textures/ceramic/Poliigon_ClayCeramicGlossy_5212_Normal.png",
    roughness:
      "/textures/ceramic/Poliigon_ClayCeramicGlossy_5212_Roughness.jpg",
    metalness: "/textures/ceramic/Poliigon_ClayCeramicGlossy_5212_Metallic.jpg",
  },
  diamond: {
    base: "/textures/diamond/Image_0_2@channels=G.jpeg",
    normal: "/textures/diamond/Image_1_0.jpeg",
    roughness: "/textures/diamond/Image_1_1.png",
    metalness: "/textures/diamond/Image_1_1.png",
  },
  wood: {
    base: "/textures/wood/Wood066_1K-PNG_Color.png",
    normal: "/textures/wood/Wood066_1K-PNG_NormalDX.png",
    roughness: "/textures/wood/Wood066_1K-PNG_Roughness.png",
    metalness: "/textures/wood/Wood066_1K-PNG_Displacement.png",
  },
  metal: {
    base: "/textures/metal/Poliigon_MetalSteelBrushed_7174_BaseColor.jpg",
    normal: "/textures/metal/Poliigon_MetalSteelBrushed_7174_Normal.png",
    roughness: "/textures/metal/Poliigon_MetalSteelBrushed_7174_Roughness.jpg",
    metalness: "/textures/metal/Poliigon_MetalSteelBrushed_7174_Metallic.jpg",
  },
};

export default function useRingMaterial({ type = "gold" }: MaterialProps) {
  const safeType: MaterialType = (
    ["gold", "silver", "ceramic", "diamond", "wood", "metal"] as const
  ).includes(type as MaterialType)
    ? (type as MaterialType)
    : "silver";

  const paths = TEXTURE_PATHS[safeType];

  const [base, normal, roughness, metalness] = useLoader(TextureLoader, [
    paths.base,
    paths.normal,
    paths.roughness,
    paths.metalness,
  ]);

  // tạo material
  const material = useMemo(() => {
    if (safeType === "diamond") {
      return new MeshPhysicalMaterial({
        map: base,
        normalMap: normal,
        roughnessMap: roughness,
        metalnessMap: metalness,
        transparent: true,
        transmission: 0.95,
        ior: 2.4,
        thickness: 0.5,
        roughness: 0,
        metalness: 0,
      });
    } else {
      return new MeshStandardMaterial({
        map: base,
        normalMap: normal,
        roughnessMap: roughness,
        metalnessMap: metalness,
        metalness: safeType === "ceramic" ? 0 : 1,
        roughness: safeType === "ceramic" ? 0.4 : 0.15,
      });
    }
  }, [safeType, base, normal, roughness, metalness]);

  //cleanup: dispose khi material thay đổi
  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  return material;
}
