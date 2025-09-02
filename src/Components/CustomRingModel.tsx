"use client";
import { Decal, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import useMaterial from "./Material.Hard";
import * as THREE from "three";

useGLTF.preload("/Models/rings/ringb2.glb");

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
  const { scene } = useGLTF("/Models/rings/ringb2.glb");
  const targetRef = useRef<THREE.Mesh>(null!);
  const [decalPos, setDecalPos] = useState<THREE.Vector3 | null>(null);

  // --- tạo texture từ canvas ---
  const textTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 700;
    canvas.height = 300;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Tự động co chữ vừa khung decal
    let fontSize = 90;
    ctx.font = `italic ${fontSize}px 'Alpino'`;

    while (
      ctx.measureText(engravingText).width > canvas.width * 0.8 &&
      fontSize > 20
    ) {
      fontSize -= 2;
      ctx.font = `italic ${fontSize}px "Brush Script MT", cursive`;
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

  // Tìm mesh target và tính tâm
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

          // Tính tâm geometry
          child.geometry.computeBoundingBox();
          const center = new THREE.Vector3();
          child.geometry.boundingBox.getCenter(center);

          // Đưa tâm về local space của mesh
          setDecalPos(center);
        }
      }
    });
  }, [scene, materialMapping, materialCache]);

  return (
    <group scale={scale}>
      {/* Ring */}
      <primitive
        object={scene}
        onPointerOver={() => (document.body.style.cursor = "grab")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      />

      {/* In chữ decal 2D */}
      {textTexture && targetRef.current && decalPos && (
        <Decal
          mesh={targetRef}
          position={decalPos} // luôn ở tâm mesh
          rotation={[0, -1.6, 0]} // xoay decal nếu cần
          scale={[0.25, 0.1, 0.15]} // cố định scale
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
