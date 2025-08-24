"use client";

import { FC, useState } from "react";
import { Button } from "@/ui/button";

type NecklacePart = {
  name: string;
  label: string;
};

type Material =
  | "gold"
  | "silver"
  | "ceramic"
  | "diamond"
  | "wood"
  | "metal"
  | "cotton"
  | "linen"
  | "silk";

type Props = {
  parts: NecklacePart[];
  onChange: (partName: string, material: Material) => void;
};

const NecklaceMaterialSelector: FC<Props> = ({ parts, onChange }) => {
  const allMaterials: Material[] = [
    "gold",
    "silver",
    "ceramic",
    "diamond",
    "wood",
    "metal",
    "cotton",
    "linen",
    "silk",
  ];

  const [partMaterials, setPartMaterials] = useState<Record<string, number>>(
    () => Object.fromEntries(parts.map((p) => [p.name, 0])),
  );

  const getMaterialsForPart = (partName: string) => {
    if (partName === "cross") {
      return allMaterials.filter(
        (m) => !["cotton", "linen", "silk"].includes(m),
      );
    }
    return allMaterials;
  };

  const handleChange = (partName: string, direction: "prev" | "next") => {
    const materials = getMaterialsForPart(partName);
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
          <tr>
            <th className="border px-4 py-2">Parts</th>
            <th className="border px-4 py-2">Material</th>
            <th className="border px-4 py-2">Change</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => {
            const materials = getMaterialsForPart(part.name);
            const currentIndex = partMaterials[part.name] ?? 0;
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

export default NecklaceMaterialSelector;
