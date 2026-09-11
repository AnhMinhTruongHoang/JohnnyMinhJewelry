"use client";

import { Center, Float, useGLTF } from "@react-three/drei";
import { forwardRef, ReactNode } from "react";
import { Group } from "three";
import CrossNecklaceModel from "./crossNecklace";

type FloatingNecklaceProps = {
  scale?: number;
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
} & JSX.IntrinsicElements["group"];

useGLTF.preload("/Models/necklace/crossNecklace.glb");

const FloatingNecklace = forwardRef<Group, FloatingNecklaceProps>(
  (
    {
      scale = 5,
      floatSpeed = 0.85,
      rotationIntensity = 0.04,
      floatIntensity = 0.1,
      floatingRange = [-0.02, 0.02],
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}

          {/* The necklace GLB has an offset origin, so center its geometry first. */}
          <Center>
            <CrossNecklaceModel scale={scale} />
          </Center>
        </Float>
      </group>
    );
  },
);

FloatingNecklace.displayName = "FloatingNecklace";

export default FloatingNecklace;
