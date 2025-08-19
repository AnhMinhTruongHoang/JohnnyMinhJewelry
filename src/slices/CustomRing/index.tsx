"use client";
import { FC, Suspense, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import MaterialSelector from "./meterial.change";
import CustomRingModel from "@/Components/CustomRingModel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/**
 * Props for `CustomRing`.
 */
export type CustomRingProps = SliceComponentProps<Content.CustomRingSlice>;

const CustomRingSlice: FC<CustomRingProps> = ({ slice }) => {
  const [materialType, setMaterialType] = useState<
    "gold" | "silver" | "ceramic"
  >("gold");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50"
    >
      {/* Heading */}
      <div className="mb-6 text-center">
        <PrismicRichText field={slice.primary.heading} />
      </div>

      {/* Model nhẫn */}
      <div className="flex h-[500px] w-full items-center justify-center">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <CustomRingModel materialType={materialType} scale={1.5} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>

      {/* Material selector */}
      <div className="mt-6">
        <MaterialSelector onChange={setMaterialType} />
      </div>
    </section>
  );
};

export default CustomRingSlice;
