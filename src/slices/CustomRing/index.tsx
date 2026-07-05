"use client";
import * as THREE from "three";
import { FC, Suspense, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import MaterialSelector from "./ring.material.change";
import CustomRingModel from "@/Components/CustomRingModel";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import TaskBar from "@/Components/TaskBar";

export type CustomRingProps = SliceComponentProps<Content.CustomRingSlice>;

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

const CustomRingSlice: FC<CustomRingProps> = ({ slice }) => {
  const [engravingText, setEngravingText] = useState("Name");

  const defaultMapping: Record<
    string,
    "gold" | "silver" | "ceramic" | "diamond" | "metal" | "wood"
  > = {
    Circle001: "gold",
    Circle002: "gold",
    Circle004: "gold",
    Circle006: "silver",
    dobj: "diamond",
    dobj001: "diamond",
    dobj003: "diamond",
    Prong001: "ceramic",
  };

  const [materialMapping, setMaterialMapping] = useState(defaultMapping);

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
    link.download = "JM-Custom-Ring.png";
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

  return (
    <section
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
    className="relative flex min-h-screen w-full max-w-[100vw] flex-col items-center justify-center overflow-x-hidden px-4 py-16 sm:px-6"
    style={{ backgroundColor: "#F7F0E6" }}
  >
      <div className="mt-16 text-center font-serif text-6xl">
        <i>
          <PrismicRichText field={slice.primary.heading} />
        </i>
      </div>

      <div className="flex h-[300px] w-[600px] items-center justify-center">
        <Canvas
          camera={{ position: [1, 1, 0], fov: 40 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <CustomRingModel
              ref={modelRef}
              scale={2}
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

      <TaskBar
        handleSceneShot={handleSceneShot}
        handleRefresh={handleRefresh}
        getSceneShot={getSceneShot}
      />

      <div className="mb-10 mt-6">
        <MaterialSelector
          parts={[
            { name: "Circle006", label: "Circle" },
            { name: "Circle001", label: "Ring band" },
            { name: "dobj", label: "Pattern 1" },
            { name: "dobj001", label: "Pattern 2" },
            { name: "Circle", label: "Mini stone" },
            { name: "Prong001", label: "Stone prong" },
            { name: "dobj003", label: "Hearth" },
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

export default CustomRingSlice;
