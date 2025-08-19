"use client";

import { FC, useState } from "react";
import { Button } from "@/Components/ui/button";

type Props = {
  onChange: (type: "gold" | "silver" | "ceramic") => void;
};

const MaterialSelector: FC<Props> = ({ onChange }) => {
  const materials: ("gold" | "silver" | "ceramic")[] = [
    "gold",
    "silver",
    "ceramic",
  ];
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    const newIndex = (index - 1 + materials.length) % materials.length;
    setIndex(newIndex);
    onChange(materials[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (index + 1) % materials.length;
    setIndex(newIndex);
    onChange(materials[newIndex]);
  };

  return (
    <div className="flex items-center gap-4">
      <Button onClick={handlePrev} aria-label="Previous material">
        ◀
      </Button>

      {/* Tên material hiện tại */}
      <span className="min-w-[80px] text-center font-medium capitalize">
        {materials[index]}
      </span>

      <Button onClick={handleNext} aria-label="Next material">
        ▶
      </Button>
    </div>
  );
};

export default MaterialSelector;
