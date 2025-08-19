"use client";

import { Button } from "@/Components/ui/button";
import { FC } from "react";

type Props = {
  onChange: (type: "gold" | "silver" | "ceramic") => void;
};

const MaterialSelector: FC<Props> = ({ onChange }) => {
  return (
    <div className="flex gap-4">
      <Button onClick={() => onChange("gold")}>Gold</Button>
      <Button onClick={() => onChange("silver")}>Silver</Button>
      <Button onClick={() => onChange("ceramic")}>Ceramic</Button>
    </div>
  );
};

export default MaterialSelector;
