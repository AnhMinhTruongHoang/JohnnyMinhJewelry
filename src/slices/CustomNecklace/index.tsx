"use client";

import { FC, Suspense, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import CustomNecklaceModel from "@/Components/CustomNecklaceModel";
import NecklaceMaterialSelector from "./necklace.material.change";

/**
 * Props for `CustomNecklace`.
 */
export type CustomNecklaceProps =
  SliceComponentProps<Content.CustomNecklaceSlice>;

const CustomNecklaceSlice: FC<CustomNecklaceProps> = ({ slice }) => {
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
    Record<string, "gold" | "silver" | "ceramic" | "diamond" | "metal" | "wood">
  >({
    cross: "diamond",
    wire: "silver",
    chain: "silver",
    Ribbon: "diamond",
    dobj001: "diamond",
    dobj003: "diamond",
    Prong001: "ceramic",
    topGrid: "diamond",
    bottomGrid: "ceramic",
    ...Object.fromEntries(Band.map((name) => [name, "ceramic"])),
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex min-h-screen flex-col items-center justify-center bg-gray-400"
    >
      {/* Heading */}
      <hr />
      <div className="text-center font-serif text-6xl">
        <PrismicRichText field={slice.primary.heading} />
      </div>

      {/* Model nhẫn */}
      <div className="flex h-[500px] w-full items-center justify-center">
        <Canvas camera={{ fov: 30 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <CustomNecklaceModel scale={3} materialMapping={materialMapping} />
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
      <div className="mb-5 mt-5">
        <NecklaceMaterialSelector
          parts={[
            { name: "Band", label: "Band" },
            { name: "topGrid", label: "Top Grid" },
            { name: "bottomGrid", label: "Bottom Grid" },
            { name: "cross", label: "Cross" },
            { name: "wire", label: "Wire" },
            { name: "chain", label: "Chain" },
            { name: "Ribbon", label: "Ribbon" },
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
