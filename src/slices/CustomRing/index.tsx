"use client";
import { FC, Suspense, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import MaterialSelector from "./meterial.change";
import CustomRingModel from "@/Components/CustomRingModel";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

/**
 * Props for `CustomRing`.
 */
export type CustomRingProps = SliceComponentProps<Content.CustomRingSlice>;

const CustomRingSlice: FC<CustomRingProps> = ({ slice }) => {
  const [materialMapping, setMaterialMapping] = useState<
    Record<string, "gold" | "silver" | "ceramic" | "diamond">
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
      className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50"
    >
      {/* Heading */}
      <div className="mb-6 text-center font-serif text-6xl">
        <PrismicRichText field={slice.primary.heading} />
      </div>

      {/* Model nhẫn */}
      <div className="flex h-[500px] w-full items-center justify-center">
        <Canvas camera={{ position: [1, 1, 0], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <CustomRingModel scale={3} materialMapping={materialMapping} />
          </Suspense>
          <OrbitControls />
          <Environment
            files={"/HDR/lobby.hdr"}
            environmentIntensity={1.5}
            background={false}
          />
        </Canvas>
      </div>

      {/* Material selector */}
      <div className="mt-6">
        <MaterialSelector
          parts={[
            { name: "Circle001", label: "Thân nhẫn" },
            { name: "dobj", label: "Họa tiết 1" },
            { name: "dobj001", label: "Họa tiết 2" },
            { name: "Prong001", label: "Ngàm giữ đá" },
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
