import React from "react";
import { JmLogo } from "@/Components/JM.logo";
import { Moon, RefreshCw, Volume2 } from "lucide-react";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="relative z-30 flex w-full items-start justify-between gap-3 px-4 py-4 sm:items-center sm:px-6 sm:py-3 md:px-8">
      {/* Brand text */}
      <div className="min-w-0 max-w-[120px] shrink text-left sm:max-w-none">
        <b>
          <i className="block text-xs leading-5 tracking-wide text-black sm:text-sm md:text-base">
            JOHNNY
            <br className="sm:hidden" />
            <span className="sm:inline"> MINH &amp; CO</span>
          </i>
        </b>
      </div>

      {/* Logo */}
      <div className="absolute left-1/2 top-3 -translate-x-1/2 sm:static sm:translate-x-0">
        <JmLogo className="h-12 w-auto cursor-pointer sm:h-16 md:h-24" />
      </div>

      {/* Menu + Icons */}
      <nav className="flex shrink-0 items-center justify-end gap-2 text-xs text-[#2a1a1a] sm:gap-4 sm:text-sm md:gap-6">
        <a href="#about" className="hidden hover:underline sm:inline">
          About
        </a>

        <button
          type="button"
          aria-label="Sound"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 hover:opacity-70 sm:h-auto sm:w-auto sm:bg-transparent"
        >
          <Volume2 size={16} className="sm:h-[18px] sm:w-[18px]" />
        </button>

        <button
          type="button"
          aria-label="Refresh"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 hover:opacity-70 sm:h-auto sm:w-auto sm:bg-transparent"
        >
          <RefreshCw size={16} className="sm:h-[18px] sm:w-[18px]" />
        </button>

        <button
          type="button"
          aria-label="Dark Mode"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 hover:opacity-70 sm:h-auto sm:w-auto sm:bg-transparent"
        >
          <Moon size={16} className="sm:h-[18px] sm:w-[18px]" />
        </button>
      </nav>
    </header>
  );
}