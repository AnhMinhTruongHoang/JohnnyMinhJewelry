"use client";
import {
  TextureLoader,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  type Texture,
} from "three";
import { useLoader } from "@react-three/fiber";
import { useMemo, useEffect } from "react";

type MaterialType = "cotton" | "linen" | "silk";

type SoftMaterialProps = {
  type?: MaterialType;
};

const TEXTURE_PATHS: Record<
  MaterialType,
  { base: string; normal: string; roughness: string; metalness: string }
> = {
  cotton: {
    base: "/textures/Fabric/cotton.jpg",
    normal: "/textures/Fabric/Fabric006_1K-PNG_NormalDX.png",
    roughness: "/textures/Fabric/Fabric006_1K-PNG_Roughness.png",
    metalness: "/textures/Fabric/Fabric006_1K-PNG_Opacity.png",
  },
  linen: {
    base: "/textures/Fabric/black-fabric.jpg",
    normal: "/textures/Fabric/Fabric006_1K-PNG_NormalDX.png",
    roughness: "/textures/Fabric/Fabric006_1K-PNG_Roughness.png",
    metalness: "/textures/Fabric/Fabric006_1K-PNG_Opacity.png",
  },
  silk: {
    base: "/textures/Fabric/Fabric006_1K-PNG_Color.png",
    normal: "/textures/Fabric/Fabric006_1K-PNG_NormalDX.png",
    roughness: "/textures/Fabric/Fabric006_1K-PNG_Roughness.png",
    metalness: "/textures/Fabric/Fabric006_1K-PNG_Opacity.png",
  },
};

function createMaterial(
  type: MaterialType,
  maps: {
    map: Texture;
    normalMap: Texture;
    roughnessMap: Texture;
    metalnessMap: Texture;
  },
) {
  if (type === "cotton") {
    return new MeshPhysicalMaterial({
      ...maps,
      transparent: true,
      transmission: 0.95,
      ior: 2.4,
      thickness: 0.5,
      roughness: 0,
      metalness: 0,
    });
  }

  return new MeshStandardMaterial({
    ...maps,
    metalness: type === "silk" ? 0.2 : 1,
    roughness: type === "silk" ? 0.1 : 0.3,
  });
}

export default function useSoftMaterial({
  type = "cotton",
}: SoftMaterialProps) {
  const safeType: MaterialType = (
    ["cotton", "linen", "silk"] as const
  ).includes(type as MaterialType)
    ? (type as MaterialType)
    : "cotton";

  const paths = TEXTURE_PATHS[safeType];

  const [base, normal, roughness, metalness] = useLoader(TextureLoader, [
    paths.base,
    paths.normal,
    paths.roughness,
    paths.metalness,
  ]);

  const SoftMaterial = useMemo(() => {
    return createMaterial(safeType, {
      map: base,
      normalMap: normal,
      roughnessMap: roughness,
      metalnessMap: metalness,
    });
  }, [safeType, base, normal, roughness, metalness]);

  useEffect(() => {
    return () => {
      SoftMaterial.dispose();
    };
  }, [SoftMaterial]);

  return SoftMaterial;
}
