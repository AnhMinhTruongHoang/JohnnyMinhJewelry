"use client";

import { Suspense } from "react";
import { View } from "@react-three/drei";
import Scene from "./Scene";

const vietnamBrands = [
  "PNJ",
  "DOJI",
  "SJC",
  "Bảo Tín Minh Châu",
  "Huy Thanh Jewelry",
  "Skymond Luxury",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 md:px-8 md:pb-16 md:pt-28">
        <div className="grid items-center gap-10 md:min-h-[calc(100vh-7rem)] md:grid-cols-2 md:gap-12">
          {/* ===== Visual ===== */}
          <div className="order-1 md:order-2">
            <div className="relative h-[320px] w-full sm:h-[420px] md:h-[620px]">
              {/* glow nhẹ thôi, không có holder */}
              <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-3xl md:h-72 md:w-72" />

              <View className="absolute inset-0 z-10">
                <Suspense fallback={null}>
                  <Scene />
                </Suspense>
              </View>
            </div>
          </div>

          {/* ===== Text ===== */}
          <div className="order-2 md:order-1 md:pr-4">
            <div className="mx-auto max-w-xl text-center md:mx-0 md:text-left">
              <h1 className="text-[clamp(2.6rem,9vw,6.5rem)] font-light leading-[0.95] tracking-[-0.05em] text-[#4f2d2d]">
                3D for
                <br />
                Ecommerce
              </h1>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#about"
                  className="inline-flex min-w-[150px] items-center justify-center rounded-xl border border-[#7a5a5a]/25 bg-white/35 px-6 py-3 text-sm font-medium text-[#5e2d2d] backdrop-blur-sm transition hover:bg-white/55"
                >
                  Documentation
                </a>
              </div>

              <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[#6c4e4e] sm:text-base md:mx-0">
                Design houses, retailers, manufacturers, and agencies rely on
                immersive product presentation to display their most important
                collections.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-12 md:grid-cols-3">
                {vietnamBrands.map((brand) => (
                  <div
                    key={brand}
                    className="flex min-h-[72px] items-center justify-center rounded-2xl border border-white/40 bg-white/35 px-4 py-4 text-center text-sm font-medium text-[#4f2d2d] shadow-sm backdrop-blur-sm sm:min-h-[84px] sm:text-base"
                  >
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
