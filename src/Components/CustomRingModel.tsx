"use client";
import { Decal, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import useMaterial from "./Material.Hard";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

useGLTF.preload("/Models/rings/ringb.glb");

type CustomRingModelProps = {
  scale?: number;
  engravingText?: string;
  materialMapping?: Record<
    string,
    "gold" | "silver" | "ceramic" | "diamond" | "wood" | "metal"
  >;
};

export default function CustomRingModel({
  scale = 1,
  engravingText = "Text",
  materialMapping = {},
}: CustomRingModelProps) {
  const { scene } = useGLTF("/Models/rings/ringb.glb");
  const targetRef = useRef<THREE.Mesh>(null!);

  // --- tạo texture từ canvas ---
  const textTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green"; // màu chữ
    ctx.font = "60px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(engravingText, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [engravingText]);

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
        if (child.name === "Circle003_2") {
          targetRef.current = child;
        }
      }
    });
  }, [scene, materialMapping, materialCache]);

  return (
    <group scale={scale}>
      {/* Ring */}
      <primitive object={scene} />

      {/* In chữ decal 2D */}
      {textTexture && targetRef.current && (
        <Decal
          debug
          mesh={targetRef}
          position={[0, 0.0, 0]}
          rotation={[0, 0, degToRad(1)]}
          scale={[0.15, 0.05, 0.15]}
        >
          <meshBasicMaterial
            map={textTexture}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </Decal>
      )}
    </group>
  );
}
