"use client";

import * as THREE from "three";
import { FC, Suspense, useState, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Canvas, useThree } from "@react-three/fiber";
import CustomEarringsModel from "@/Components/CustomEarrings";
import { Environment, OrbitControls } from "@react-three/drei";
import EarringMaterialSelector from "./earrings.material.change";
import TaskBar from "@/Components/TaskBar";

export type CustomEarringProps = SliceComponentProps<Content.EarringsSlice>;

// Component tạm để lấy WebGLRenderer
const SceneShotHelper = ({
  onReady,
}: {
  onReady: (gl: THREE.WebGLRenderer) => void;
}) => {
  const { gl } = useThree();
  onReady(gl);
  return null;
};

const EarringsSlice: FC<CustomEarringProps> = ({ slice }) => {
  const defaultMapping: Record<
    string,
    "gold" | "silver" | "ceramic" | "diamond" | "metal" | "wood"
  > = {
    diamond: "diamond",
    diamondSmall: "diamond",
    holders: "gold",
  };

  const [materialMapping, setMaterialMapping] = useState(defaultMapping);

  const modelRef = useRef<{
    getScene: () => THREE.Group;
    resetMaterials: (mapping?: typeof defaultMapping) => void;
  }>(null);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Chụp ảnh base64
  const getSceneShot = () => {
    const gl = rendererRef.current;
    return gl ? gl.domElement.toDataURL("image/png") : null;
  };

  // Tải ảnh xuống
  const handleSceneShot = () => {
    if (!rendererRef.current) return;
    const dataURL = rendererRef.current.domElement.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "JM-Custom-Earrings.png";
    link.click();
  };

  // Reset materials
  const handleRefresh = () => {
    setMaterialMapping(defaultMapping);
    modelRef.current?.resetMaterials(defaultMapping);
    requestAnimationFrame(() => {
      modelRef.current?.resetMaterials(defaultMapping);
    });
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex min-h-screen flex-col items-center justify-center bg-gray-100"
    >
      {/* Heading */}
      <div className="mt-16 text-center font-serif text-6xl">
        <i>
          <PrismicRichText field={slice.primary.heading} />
        </i>
      </div>

      {/* Model */}
      <div className="mt-16 flex h-[600px] w-[600px] items-center justify-center">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <CustomEarringsModel
              ref={modelRef}
              scale={0.5}
              materialMapping={materialMapping}
              rotation={[0, Math.PI / 4, 0]}
            />
          </Suspense>
          <OrbitControls />
          <Environment
            files={"/HDR/lobby.hdr"}
            environmentIntensity={1}
            background={false}
          />
          <SceneShotHelper onReady={(gl) => (rendererRef.current = gl)} />
        </Canvas>
      </div>

      <TaskBar
        handleSceneShot={handleSceneShot}
        handleRefresh={handleRefresh}
        getSceneShot={getSceneShot}
      />

      {/* Material selector */}
      <div className="mb-10 mt-6">
        <EarringMaterialSelector
          parts={[
            { name: "diamond", label: "Diamond" },
            { name: "diamondSmall", label: "Small Diamond" },
            { name: "holders", label: "Holders" },
          ]}
          onChange={(partName, material) => {
            setMaterialMapping((prev) => ({
              ...prev,
              [partName]: material,
            }));
          }}
        />
      </div>
    </section>
  );
};

export default EarringsSlice;
