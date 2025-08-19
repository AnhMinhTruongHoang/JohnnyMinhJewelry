"use client";
import { TextureLoader, MeshStandardMaterial } from "three";
import { useLoader } from "@react-three/fiber";

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

  return new MeshStandardMaterial({
    map: base,
    normalMap: normal,
    roughnessMap: roughness,
    metalnessMap: metalness,
  });
}
