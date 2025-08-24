"use client";

import { FC, useState } from "react";
import { Button } from "@/ui/button";

type RingPart = {
  name: string;
  label: string;
};

type Props = {
  parts: RingPart[]; // danh sách các mesh name
  onChange: (
    partName: string,
    material: "gold" | "silver" | "ceramic" | "diamond" | "wood" | "metal",
  ) => void;
};

const RingMaterialSelector: FC<Props> = ({ parts, onChange }) => {
  const materials: (
    | "gold"
    | "silver"
    | "ceramic"
    | "diamond"
    | "wood"
    | "metal"
  )[] = ["gold", "silver", "ceramic", "diamond", "wood", "metal"];

  // state lưu material hiện tại của từng part
  const [partMaterials, setPartMaterials] = useState<Record<string, number>>(
    () =>
      Object.fromEntries(
        parts.map((p) => [p.name, 0]), // mặc định chọn gold
      ),
  );

  const handleChange = (partName: string, direction: "prev" | "next") => {
    const currentIndex = partMaterials[partName] ?? 0;
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + materials.length) % materials.length
        : (currentIndex + 1) % materials.length;

    setPartMaterials((prev) => ({
      ...prev,
      [partName]: newIndex,
    }));

    onChange(partName, materials[newIndex]);
  };

  return (
    <div className="w-full max-w-lg overflow-x-auto">
      <table className="w-full border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Parts</th>
            <th className="border px-4 py-2">Material</th>
            <th className="border px-4 py-2">Change</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => {
            const currentIndex = partMaterials[part.name];
            return (
              <tr key={part.name}>
                <td className="border px-4 py-2">{part.label}</td>
                <td className="border px-4 py-2 capitalize">
                  {materials[currentIndex]}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleChange(part.name, "prev")}
                      aria-label={`Previous material for ${part.label}`}
                    >
                      ◀
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleChange(part.name, "next")}
                      aria-label={`Next material for ${part.label}`}
                    >
                      ▶
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RingMaterialSelector;
