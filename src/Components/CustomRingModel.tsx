"use client";
import { Decal, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import useMaterial from "./Material.Hard";
import * as THREE from "three";
import { useControls } from "leva";

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
  /// control
  const { rotX, rotY, rotZ } = useControls("Decal Rotation", {
    rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  });

  // --- tạo texture từ canvas ---
  const textTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Tự động co chữ vừa khung decal
    let fontSize = 80; // bắt đầu font to
    ctx.font = `${fontSize}px Arial`;
    while (
      ctx.measureText(engravingText).width > canvas.width * 0.8 &&
      fontSize > 20
    ) {
      fontSize -= 2;
      ctx.font = `${fontSize}px Arial`;
    }

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
          position={[0, 0, 0]}
          rotation={[0, -1.6, 0]} // cố định luôn center ở đây
          scale={[0.25, 0.1, 0.15]} // không đổi nữa
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
