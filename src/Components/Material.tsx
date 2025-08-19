"use client";
import {
  TextureLoader,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
} from "three";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";

type MaterialType = "gold" | "silver" | "ceramic" | "diamond";

type MaterialProps = {
  type?: MaterialType;
};

const TEXTURE_PATHS: Record<
  MaterialType,
  { base: string; normal: string; roughness: string; metalness: string }
> = {
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
    metalness: "/Models/rings/textures/diamond/Image_1_1.png",
  },
};

export default function useRingMaterial({ type = "gold" }: MaterialProps) {
  // Luôn có một type hợp lệ → luôn gọi hook theo cùng thứ tự
  const safeType: MaterialType = (
    ["gold", "silver", "ceramic", "diamond"] as const
  ).includes(type as MaterialType)
    ? (type as MaterialType)
    : "silver";

  const paths = TEXTURE_PATHS[safeType];

  // useLoader luôn được gọi (không return sớm)
  const [base, normal, roughness, metalness] = useLoader(TextureLoader, [
    paths.base,
    paths.normal,
    paths.roughness,
    paths.metalness,
  ]);

  // Chỉ tạo material trong useMemo (không gọi hook bên trong)
  return useMemo(() => {
    if (safeType === "diamond") {
      return new MeshPhysicalMaterial({
        color: "#ffffff", // Giữ trong suốt
        normalMap: normal, // Giữ normal để facet đẹp
        transparent: true,
        transmission: 1, // 100% xuyên sáng
        ior: 2.4, // Chỉ số khúc xạ của diamond
        thickness: 0.8, // Độ dày ảo
        roughness: 0, // Siêu bóng
        metalness: 0, // Diamond không phải kim loại
        reflectivity: 1,
        envMapIntensity: 1.5, // Cho phản chiếu sáng hơn
      });
    }

    return new MeshStandardMaterial({
      map: base,
      normalMap: normal,
      roughnessMap: roughness,
      metalnessMap: metalness,
      metalness: safeType === "ceramic" ? 0 : 1,
      roughness: safeType === "ceramic" ? 0.4 : 0.15,
    });
  }, [safeType, base, normal, roughness, metalness]);
}
