"use client";

import { FC, Suspense, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Canvas } from "@react-three/fiber";
import CustomEarringsModel from "@/Components/CustomEarrings";
import { Environment, OrbitControls } from "@react-three/drei";
import EarringMaterialSelector from "./earrings.material.change";

/**
 * Props for `Earrings`.
 */
export type CustomEarringProps = SliceComponentProps<Content.EarringsSlice>;

const EarringsSlice: FC<CustomEarringProps> = ({ slice }) => {
  const [materialMapping, setMaterialMapping] = useState<
    Record<string, "gold" | "silver" | "ceramic" | "diamond" | "metal" | "wood">
  >({
    Diamond: "diamond",
    DiamondSmall: "diamond",
    Holders: "gold",
  });

  ///
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
      <div className="flex h-[600px] w-[600px] items-center justify-center">
        <Canvas camera={{ position: [1, 1, 0], fov: 40 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <CustomEarringsModel scale={3} materialMapping={materialMapping} />
          </Suspense>
          <OrbitControls />
          <Environment
            files={"/HDR/lobby.hdr"}
            environmentIntensity={1}
            background={false}
          />
        </Canvas>
      </div>

      {/* Material selector */}
      <div className="mb-10 mt-6">
        <EarringMaterialSelector
          parts={[
            { name: "Diamond", label: "Diamond" },
            { name: "DiamondSmall", label: "Small Diamond" },
            { name: "Holders", label: "Holders" },
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
