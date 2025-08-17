"use client";
import { useGLTF } from "@react-three/drei";

type RingModelProps = JSX.IntrinsicElements["group"] & {
  scale?: number;
};

export default function RingModel({ scale = 1, ...props }: RingModelProps) {
  const { scene } = useGLTF("/Models/rings/source/RING.glb");

  return <primitive object={scene} scale={scale} {...props} />;
}

useGLTF.preload("/Models/rings/source/RING.glb");
