"use client";

import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { View } from "@react-three/drei";
import { Bounded } from "@/Components/Bounded";
import Scene from "./Scene";
import SceneNecklace from "./SceneNecklace";
import { Suspense } from "react";
import Loader from "@/Components/Loader";

export type AlternatingTextProps = SliceComponentProps<Content.HeroSlice>;

const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  return (
    <>
      <Loader />
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="alternating-text-container"
      >
        {/* --- SECTION 1 --- */}
        <section className="relative h-screen">
          {/* 3D Scene 1 */}
          <View className="absolute inset-0">
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </View>

          {/* Text */}
          <div className="relative z-10 grid h-full place-items-center px-6 md:grid-cols-2 md:gap-x-12">
            <div className="rounded-lg p-4 max-md:bg-white/60 max-md:backdrop-blur-sm md:col-start-2 md:ml-12">
              <h2 className="mb-4 text-3xl font-bold text-[#5e2d2d] md:text-6xl">
                <PrismicText field={slice.primary.Heading} />
              </h2>
              <i className="mt-6 text-base leading-relaxed md:text-xl">
                <PrismicRichText field={slice.primary.body} />
              </i>
            </div>
          </div>
        </section>

        {/* --- SECTION 2 --- */}
        <section className="relative h-screen">
          {/* 3D Scene 2 */}
          <View className="absolute inset-0">
            <Suspense fallback={null}>
              <SceneNecklace />
            </Suspense>
          </View>

          {/* Text */}
          <div className="relative z-10 grid h-full place-items-center px-6 md:grid-cols-2 md:gap-x-12">
            <div className="rounded-lg p-4 max-md:bg-white/60 max-md:backdrop-blur-sm md:col-start-1">
              <h2 className="mb-4 text-3xl font-bold text-[#5e2d2d] md:text-6xl">
                <PrismicText field={slice.primary.second_heading} />
              </h2>
              <i className="mt-4 text-base leading-relaxed md:text-xl">
                <PrismicRichText field={slice.primary.second_body} />
              </i>
            </div>
          </div>
        </section>
      </Bounded>
    </>
  );
};

export default AlternatingText;
