"use client";
import { FC, Suspense, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import MaterialSelector from "./ring.material.change";
import CustomRingModel from "@/Components/CustomRingModel";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import TaskBar from "@/Components/TaskBar";

/**
 * Props for `CustomRing`.
 */
export type CustomRingProps = SliceComponentProps<Content.CustomRingSlice>;

const CustomRingSlice: FC<CustomRingProps> = ({ slice }) => {
  const [engravingText, setEngravingText] = useState("Name");
  const [materialMapping, setMaterialMapping] = useState<
    Record<string, "gold" | "silver" | "ceramic" | "diamond" | "metal" | "wood">
  >({
    Circle001: "gold",
    Circle002: "gold",
    Circle004: "gold",
    dobj: "diamond",
    dobj001: "diamond",
    dobj003: "diamond",
    Prong001: "ceramic",
  });

  ////
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

      {/* Model nhẫn */}
      <div className="flex h-[300px] w-[600px] items-center justify-center">
        <Canvas camera={{ position: [1, 1, 0], fov: 40 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <CustomRingModel
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
        </Canvas>
      </div>
      {/* Input text*/}
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

      {/*Taskbar*/}
      <TaskBar />

      {/* Material selector */}
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
