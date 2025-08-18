"use client";

import { Float } from "@react-three/drei";
import { forwardRef, ReactNode } from "react";
import { Group } from "three";
import RingModel from "./ring";

type FloatingRingProps = {
  scale?: number;
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
} & JSX.IntrinsicElements["group"];

const FloatingRing = forwardRef<Group, FloatingRingProps>(
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
          <RingModel scale={scale} />
        </Float>
      </group>
    );
  },
);

FloatingRing.displayName = "FloatingRing";

export default FloatingRing;
