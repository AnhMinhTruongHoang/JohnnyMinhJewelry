"use client";

import * as THREE from "three";
import { FC, Suspense, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import CustomNecklaceModel from "@/Components/CustomNecklaceModel";
import NecklaceMaterialSelector from "./necklace.material.change";
import TaskBar from "@/Components/TaskBar";

/**
 * Props for `CustomNecklace`.
 */
export type CustomNecklaceProps =
  SliceComponentProps<Content.CustomNecklaceSlice>;

// Component tạm để lấy gl
const SceneShotHelper = ({
  onReady,
}: {
  onReady: (gl: THREE.WebGLRenderer) => void;
}) => {
  const { gl } = useThree();
  onReady(gl);
  return null;
};

const CustomNecklaceSlice: FC<CustomNecklaceProps> = ({ slice }) => {
  const [engravingText, setEngravingText] = useState("Name");

  const defaultMapping: Record<
    string,
    | "gold"
    | "silver"
    | "ceramic"
    | "diamond"
    | "metal"
    | "wood"
    | "silk"
    | "cotton"
    | "linen"
  > = {
    Ribbon: "silk",
  };

  const Band = [
    //// merge mesh
    "nbi01",
    "nbi02",
    "nbi03",
    "nib04",
    "nob01",
    "nob02",
    "nob03",
    "nob04",
  ];
  /////
  const [materialMapping, setMaterialMapping] = useState<
    Record<
      string,
      | "gold"
      | "silver"
      | "ceramic"
      | "diamond"
      | "metal"
      | "wood"
      | "cotton"
      | "linen"
      | "silk"
    >
  >({
    cross: "diamond",
    wire: "silver",
    chain: "silver",
    Ribbon: "silk",
    topGrid: "silver",
    bottomGrid: "silver",
    ...Object.fromEntries(Band.map((name) => [name, "silk"])),
  });

  // ref đến API của model
  const modelRef = useRef<{
    getScene: () => THREE.Group;
    resetMaterials: (mapping?: typeof defaultMapping) => void;
  }>(null);

  // ref lưu WebGLRenderer

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Chụp ảnh trả về base64 (hoặc null)
  const getSceneShot = () => {
    const gl = rendererRef.current;
    if (!gl) return null;
    return gl.domElement.toDataURL("image/png");
  };

  // SceneShot func

  const handleSceneShot = () => {
    if (!rendererRef.current) return;

    const gl = rendererRef.current;
    const dataURL = gl.domElement.toDataURL("image/png"); // xuất ảnh PNG

    // download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "JM-Custom-Necklace.png";
    link.click();
  };

  // reset mesh
  const handleRefresh = () => {
    setEngravingText("Name");
    setMaterialMapping(defaultMapping);
    modelRef.current?.resetMaterials(defaultMapping);
    requestAnimationFrame(() => {
      modelRef.current?.resetMaterials(defaultMapping);
    });
  };

  ///

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-900 text-white"
    >
      {/* Heading */}
      <hr />
      <div className="mt-36 text-center font-serif text-6xl">
        <i>
          <PrismicRichText field={slice.primary.heading} />
        </i>
      </div>

      {/* Model nhẫn */}
      <div className="flex h-[450px] w-[600px] items-center justify-center">
        <Canvas camera={{ fov: 25 }} gl={{ preserveDrawingBuffer: true }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <CustomNecklaceModel
              ref={modelRef}
              scale={3}
              materialMapping={materialMapping}
              engravingText={engravingText}
            />
          </Suspense>
          <OrbitControls />
          <Environment
            files={"/HDR/lobby.hdr"}
            environmentIntensity={1}
            background={false}
          />
          {/* helper để lấy gl */}
          <SceneShotHelper onReady={(gl) => (rendererRef.current = gl)} />
        </Canvas>
      </div>
      {/* input text */}
      <div className="items-center text-center">
        <label htmlFor="engraving-text" className="mb-2 block font-medium">
          <i>Signature</i>
        </label>
        <input
          id="engraving-text"
          type="text"
          value={engravingText}
          onChange={(e) => setEngravingText(e.target.value)}
          maxLength={8}
          className="mb-4 rounded border p-2 text-center"
        />
      </div>
      {/* taskbar*/}
      <TaskBar
        handleSceneShot={handleSceneShot}
        handleRefresh={handleRefresh}
        getSceneShot={getSceneShot}
      />

      {/* Material selector */}
      <div className="mb-5 mt-5">
        <NecklaceMaterialSelector
          parts={[
            { name: "Band", label: "Band" },
            { name: "Ribbon", label: "Ribbon" },
            { name: "topGrid", label: "Top Grid" },
            { name: "bottomGrid", label: "Bottom Grid" },
            { name: "cross", label: "Cross" },
            { name: "wire", label: "Wire" },
            { name: "chain", label: "Chain" },
          ]}
          onChange={(partName, material) => {
            if (partName === "Band") {
              setMaterialMapping((prev) => ({
                ...prev,
                ...Object.fromEntries(Band.map((name) => [name, material])),
              }));
            } else {
              setMaterialMapping((prev) => ({
                ...prev,
                [partName]: material,
              }));
            }
          }}
        />
      </div>
    </section>
  );
};

export default CustomNecklaceSlice;
