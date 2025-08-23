"use client";
import { useGLTF } from "@react-three/drei";

type NecklaceModelProps = JSX.IntrinsicElements["group"] & {
  scale?: number;
};

export default function CrossNecklaceModel({
  scale = 1,
  ...props
}: NecklaceModelProps) {
  const { scene } = useGLTF("/Models/necklace/crossNecklace.glb");

  return <primitive object={scene} scale={scale} {...props} />;
}

useGLTF.preload("/Models/necklace/crossNecklace.glb");
