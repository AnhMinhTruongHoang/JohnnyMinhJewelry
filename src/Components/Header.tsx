import React from "react";
import { JmLogo } from "@/Components/JM.logo";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="-mb-28 flex justify-center py-4">
      <JmLogo className="z-32 mb-25 h-32 cursor-pointer" />
    </header>
  );
}
