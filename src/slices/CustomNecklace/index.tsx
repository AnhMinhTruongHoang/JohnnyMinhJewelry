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
      <div className="flex h-[600px] w-[600px] items-center justify-center">
        <Canvas camera={{ fov: 25 }}>
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
