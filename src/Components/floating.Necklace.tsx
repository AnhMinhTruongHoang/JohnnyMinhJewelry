"use client";

import { Float, useGLTF } from "@react-three/drei";
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

useGLTF.preload("/Models/necklace/source/crossNecklace.glb");

const FloatingNecklace = forwardRef<Group, FloatingNecklaceProps>(
  (
    {
      scale = 5,
      floatSpeed = 2,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
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
          <CrossNecklaceModel scale={scale} />
        </Float>
      </group>
    );
  },
);

FloatingNecklace.displayName = "FloatingNecklace";

export default FloatingNecklace;
