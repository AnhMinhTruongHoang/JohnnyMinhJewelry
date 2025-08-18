import React from "react";
import { JmLogo } from "@/Components/JM.logo";
import { Moon, RefreshCw, Volume2 } from "lucide-react";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="flex items-center justify-between px-6 py-2 ">
      {/* Logo */}
      <div>
        <b>
          <i>JOHNNY MINH & CO</i>
        </b>
      </div>
      <div>
        <JmLogo className="h-20 cursor-pointer" />
      </div>

      {/* Menu + Icons */}
      <nav className="flex items-center gap-6 text-sm text-[#2a1a1a]">
        <a href="#about" className="hover:underline">
          About
        </a>
        <button aria-label="Sound" className="hover:opacity-70">
          <Volume2 size={18} />
        </button>
        <button aria-label="Refresh" className="hover:opacity-70">
          <RefreshCw size={18} />
        </button>
        <button aria-label="Dark Mode" className="hover:opacity-70">
          <Moon size={18} />
        </button>
      </nav>
    </header>
  );
}
