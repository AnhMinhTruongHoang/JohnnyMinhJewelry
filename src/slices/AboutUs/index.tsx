import { JmLogo } from "@/Components/JM.logo";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type AboutUsProps = SliceComponentProps<Content.AboutUsSlice>;

export default function AboutUsSlice({ slice }: AboutUsProps) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative h-[600px] w-full"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/aboutVid.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="text-white lg:w-1/2">
          <h2 className="mb-4 text-center font-serif text-4xl">
            <PrismicRichText field={slice.primary.heading} />
          </h2>
          <i className="mb-6 bg-slate-700 leading-relaxed">
            <PrismicRichText field={slice.primary.description} />
          </i>
          <hr className="my-6 border-t-2 border-gray-300" />
          <div>
            <JmLogo className="h-24 cursor-pointer text-black" />
          </div>
        </div>
      </div>
    </section>
  );
}
