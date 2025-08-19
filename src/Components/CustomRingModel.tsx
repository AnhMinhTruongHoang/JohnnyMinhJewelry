"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import useRingMaterial from "./RingMaterial";

useGLTF.preload("/Models/rings/source/RING_custom.glb");

type CustomRingModelProps = {
  scale?: number;
  materialType?: "gold" | "silver" | "ceramic" | "diamond";
};

export default function CustomRingModel({
  scale = 1.2,
  materialType = "ceramic",
}: CustomRingModelProps) {
  const { scene } = useGLTF("/Models/rings/source/RING_custom.glb");

  // chuẩn bị nhiều loại vật liệu
  const baseMaterial = useRingMaterial({ type: "gold" });
  const detailMaterial = useRingMaterial({ type: "diamond" });
  const prongMaterial = useRingMaterial({ type: "silver" });

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child: any) => {
      if (child.isMesh) {
        switch (child.name) {
          case "Circle001":
          case "Circle002":
          case "Circle004":
            child.material = baseMaterial; // thân nhẫn
            break;

          case "dobj":
          case "dobj001":
          case "dobj003":
            child.material = detailMaterial; // họa tiết
            break;

          case "Prong001":
            child.material = prongMaterial; // ngàm giữ đá
            break;

          default:
            child.material = baseMaterial;
        }
      }
    });
  }, [scene, baseMaterial, detailMaterial, prongMaterial]);

  return <primitive object={scene} scale={scale} />;
}
