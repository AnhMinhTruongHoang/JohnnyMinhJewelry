"use client";
import { Decal, useGLTF } from "@react-three/drei";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import useMaterial from "./Material.Hard";
import useSoftMaterial from "./Material.Soft";
import * as THREE from "three";

useGLTF.preload("/Models/necklace/Necklace01.glb");

type MaterialType =
  | "gold"
  | "silver"
  | "ceramic"
  | "diamond"
  | "wood"
  | "metal"
  | "silk"
  | "cotton"
  | "linen";
type Mapping = Record<string, MaterialType>;

type CustomNecklaceModelProps = {
  scale?: number;
  engravingText?: string;
  materialMapping?: Mapping;
};

const CustomNecklaceModel = forwardRef<
  {
    getScene: () => THREE.Group;
    resetMaterials: (mapping?: Mapping) => void; // <-- nhận mapping
  },
  CustomNecklaceModelProps
>(({ scale = 1, engravingText = "Text", materialMapping = {} }, ref) => {
  const { scene } = useGLTF("/Models/necklace/Necklace01.glb");
  const targetRef = useRef<THREE.Mesh>(null!);
  const [decalPos, setDecalPos] = useState<THREE.Vector3 | null>(null);
  const [textTexture, setTextTexture] = useState<THREE.CanvasTexture | null>(
    null,
  );

  // cache materials
  const goldMat = useMaterial({ type: "gold" });
  const silverMat = useMaterial({ type: "silver" });
  const ceramicMat = useMaterial({ type: "ceramic" });
  const diamondMat = useMaterial({ type: "diamond" });
  const woodMat = useMaterial({ type: "wood" });
  const metalMat = useMaterial({ type: "metal" });
  ///soft Material
  const linenMat = useSoftMaterial({ type: "linen" });
  const cottonMat = useSoftMaterial({ type: "cotton" });
  const silkMat = useSoftMaterial({ type: "silk" });

  const materialCache = useMemo(
    () => ({
      gold: goldMat,
      silver: silverMat,
      ceramic: ceramicMat,
      diamond: diamondMat,
      wood: woodMat,
      metal: metalMat,
      linen: linenMat,
      cotton: cottonMat,
      silk: silkMat,
    }),
    [
      goldMat,
      silverMat,
      ceramicMat,
      diamondMat,
      woodMat,
      metalMat,
      linenMat,
      cottonMat,
      silkMat,
    ],
  );

  // expose API ra ngoài
  useImperativeHandle(ref, () => ({
    getScene: () => scene as THREE.Group,
    resetMaterials: (mapping?: Mapping) => {
      const mapToUse = mapping ?? materialMapping; // ưu tiên mapping truyền vào
      scene.traverse((child: any) => {
        if (child.isMesh) {
          const matType = mapToUse[child.name as keyof Mapping];
          if (matType && materialCache[matType]) {
            child.material = materialCache[matType];
            child.material.needsUpdate = true;
          }
        }
      });
    },
  }));

  // tạo texture chữ khắc
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 700;
    canvas.height = 300;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let fontSize = 90;
    const font = new FontFace(
      "SignRathi",
      "url(/fonts/FzSignRathi_Update.ttf)",
    );
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);

      ctx.font = `italic ${fontSize}px 'SignRathi'`;
      while (
        ctx.measureText(engravingText).width > canvas.width * 0.8 &&
        fontSize > 20
      ) {
        fontSize -= 2;
        ctx.font = `italic ${fontSize}px 'SignRathi'`;
      }

      ctx.fillStyle = "black";
      ctx.fillText(engravingText, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      setTextTexture(texture);
    });
  }, [engravingText]);

  // gán vật liệu ban đầu + tìm vị trí decal
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child: any) => {
      if (child.isMesh) {
        // console.log("Mesh name:", child.name);
        const matType = materialMapping[child.name as keyof Mapping];
        if (matType && materialCache[matType]) {
          child.material = materialCache[matType];
        }
        if (child.name === "Text") {
          targetRef.current = child;
          child.geometry.computeBoundingBox();
          const center = new THREE.Vector3();
          child.geometry.boundingBox.getCenter(center);
          setDecalPos(center);
        }
      }
    });
  }, [scene, materialMapping, materialCache]);

  return (
    <group scale={scale}>
      <primitive
        object={scene}
        onPointerOver={() => (document.body.style.cursor = "grab")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      />

      {textTexture && targetRef.current && decalPos && (
        <Decal
          mesh={targetRef}
          position={[decalPos.x, decalPos.y - 0.01, decalPos.z]}
          rotation={[0, -1.6, 0]}
          scale={[0.25, 0.1, 0.15]}
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
});

export default CustomNecklaceModel;
