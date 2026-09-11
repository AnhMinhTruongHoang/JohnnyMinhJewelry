"use client";

import { Center, Float, useGLTF } from "@react-three/drei";
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

useGLTF.preload("/Models/rings/RING.glb");

const FloatingRing = forwardRef<Group, FloatingRingProps>(
  (
    {
      scale = 5,
      floatSpeed = 1,
      rotationIntensity = 0.1,
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
          <Center>
            <RingModel scale={scale} />
          </Center>
        </Float>
      </group>
    );
  },
);

FloatingRing.displayName = "FloatingRing";

export default FloatingRing;
