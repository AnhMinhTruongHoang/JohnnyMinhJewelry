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
        className="alternating-text-container relative"
      >
        <div className="relative z-[100]">
          {/* Scene 1 */}
          <View className="absolute left-0 top-0 h-screen w-full">
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </View>

          <section className="alternating-section grid h-screen place-items-center px-6 md:grid-cols-2 md:gap-x-12">
            <div className="rounded-lg p-4 max-md:bg-white/60 max-md:backdrop-blur-sm md:col-start-2 md:ml-12">
              <h2 className="mb-4 text-3xl font-bold text-[#5e2d2d] md:text-6xl">
                <PrismicText field={slice.primary.Heading} />
              </h2>
              <i className="mt-6 text-base leading-relaxed md:text-xl">
                <PrismicRichText field={slice.primary.body} />
              </i>
            </div>
          </section>

          {/* Scene 2 */}
          <View className="absolute left-0 top-[100vh] h-screen w-full">
            <Suspense fallback={null}>
              <SceneNecklace />
            </Suspense>
          </View>

          <section className="alternating-section grid h-screen place-items-center px-6 md:grid-cols-2 md:gap-x-12">
            <div className="rounded-lg p-4 max-md:bg-white/60 max-md:backdrop-blur-sm md:col-start-1">
              <h2 className="mb-4 text-3xl font-bold text-[#5e2d2d] md:text-6xl">
                <PrismicText field={slice.primary.second_heading} />
              </h2>
              <i className="mt-4 text-base leading-relaxed md:text-xl">
                <PrismicRichText field={slice.primary.second_body} />
              </i>
            </div>
          </section>
        </div>
      </Bounded>
    </>
  );
};

export default AlternatingText;
