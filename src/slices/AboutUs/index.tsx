import { JmLogo } from "@/Components/JM.logo";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type AboutUsProps = SliceComponentProps<Content.AboutUsSlice>;

export default function AboutUsSlice({ slice }: AboutUsProps) {
  return (
    <section
      id="about"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full max-w-[100vw] overflow-hidden bg-black"
    >
      <div className="relative min-h-[520px] w-full overflow-hidden sm:min-h-[600px] md:min-h-[680px]">
        {/* Background video */}
        <video
            className="absolute inset-0 h-full w-full scale-[1.42] object-cover object-center sm:scale-[1.25] lg:scale-110"
            src="/video/aboutVid.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[520px] w-full max-w-6xl items-center justify-center px-5 py-12 sm:min-h-[600px] sm:px-6 md:min-h-[680px] lg:px-8">
        <div className="w-full max-w-[720px] rounded-2xl bg-neutral-900/45 p-5 text-center text-white shadow-lg backdrop-blur-[2px] sm:max-w-[760px] sm:p-7 lg:max-w-[680px] lg:text-left">
            <div className="about-title mb-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl text-center">
              <PrismicRichText field={slice.primary.heading} />
            </div>

            <div className="about-desc mx-auto max-w-[620px] text-sm italic leading-7 text-white/95 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg lg:leading-9">
              <PrismicRichText field={slice.primary.description} />
            </div>

            <hr className="mx-auto my-6 w-full max-w-[520px] border-t-2 border-white/60 sm:my-8" />
            <div className="flex w-full justify-center">
              <JmLogo className="h-14 cursor-pointer text-black sm:h-20 lg:h-24" />
           </div>
          </div>
        </div>
      </div>
    </section>
  );
}