"use client";

import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Suspense } from "react";

export default function JewelryLanding() {
  return (
    <div className="alternating-text-view relative h-screen w-full overflow-x-hidden">
      <div className="alternating-text-container relative w-full">
        {/* Section 1 → Ring bên trái / Text bên phải */}
        <section className="alternating-section flex h-screen flex-col items-center justify-between px-6 md:flex-row-reverse md:px-16">
          {/* Text */}
          <div className="space-y-6 text-center md:w-1/2 md:text-left">
            <h1 className="font-serif text-5xl font-bold leading-tight md:text-7xl">
              UNIQUE <br />
              <span className="text-[#5e2d2d]">JEWELRY</span>
            </h1>
            <p className="max-w-md text-base text-gray-700 md:text-lg">
              Customize your unique ring with organic designs and pure lines
              that combine to create the true beauty of the collection.
            </p>
            <button className="rounded-full border-2 border-black px-6 py-3 text-lg transition hover:bg-black hover:text-white">
              Shop Now
            </button>
          </div>
          {/* 3D Ring */}
          <div className="flex h-[400px] justify-center md:h-[600px] md:w-1/2">
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>  
        </section>

        {/* Section 2 → Ring bên phải / Text bên trái */}
        <section className="alternating-section flex h-screen flex-col items-center justify-between px-6 md:flex-row md:px-16">
          {/* Text */}
          <div className="space-y-6 text-center md:w-1/2 md:text-left">
            <h2 className="font-serif text-5xl font-bold leading-tight md:text-7xl">
              created to last <br />
              <span className="text-[#5e2d2d]">FOREVER</span>
            </h2>
            <p className="max-w-md text-base text-gray-700 md:text-lg">
              Elegant, timeless, and created with love. Designed to endure and
              shine for a lifetime.
            </p>
          </div>
          {/* 3D Ring */}
          <div className="flex h-[400px] justify-center md:h-[600px] md:w-1/2">
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>
        </section>
      </div>
    </div>
  );
}
