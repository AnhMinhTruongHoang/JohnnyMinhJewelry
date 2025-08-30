// /hooks/useEngravingTexture.ts
"use client";
import { useMemo } from "react";
import * as THREE from "three";

export default function useEngravingTexture(text: string) {
  return useMemo(() => {
    const size = 512; // Độ phân giải texture
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Xóa nền
    ctx.clearRect(0, 0, size, size);

    // Vẽ chữ
    ctx.font = "bold 80px serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, size / 2, size / 2);

    // Convert sang texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.anisotropy = 16;

    return texture;
  }, [text]);
}
