"use client";

import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import { Bounded } from "@/Components/Bounded";

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "AlternatingText" Slice.
 */
const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container relative"
    >
      <div className="relative z-[100]">
        <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
          <Scene />
        </View>

        {/* Section 1 → Heading + Body (Ring bên trái / Text bên phải) */}
        <section className="alternating-section ml-20 grid h-screen place-items-center gap-x-12 md:grid-cols-2">
          {/* Text */}
          <div className="rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30 md:col-start-2 md:ml-12">
            <h2 className="text-6xl font-bold text-[#5e2d2d]">
              <PrismicText field={slice.primary.Heading} />
            </h2>
            <div className="mt-4 text-xl">
              <PrismicRichText field={slice.primary.body} />
            </div>
          </div>
        </section>

        {/* Section 2 → Second_Heading + Second_Body (Ring bên phải / Text bên trái) */}
        <section className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2">
          {/* Text */}
          <div className="rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30 md:col-start-1">
            <h2 className="text-6xl font-bold text-[#5e2d2d]">
              <PrismicText field={slice.primary.second_heading} />
            </h2>
            <div className="mt-4 text-xl">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
          </div>
        </section>
      </div>
    </Bounded>
  );
};

export default AlternatingText;
