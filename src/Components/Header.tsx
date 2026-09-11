import React from "react";
import { Moon, RefreshCw, Volume2 } from "lucide-react";

import { JmLogo } from "@/Components/JM.logo";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex w-full items-start justify-between gap-3 px-4 py-4 sm:items-center sm:px-6 md:px-8">
      <div className="min-w-0 max-w-[105px] shrink text-left sm:max-w-none">
        <b>
          <i className="block text-[10px] leading-[1.45] tracking-[0.08em] text-black sm:text-xs md:text-sm">
            JOHNNY
            <br className="sm:hidden" />
            <span className="sm:inline"> MINH &amp; CO</span>
          </i>
        </b>
      </div>

      <div className="absolute left-1/2 top-2.5 -translate-x-1/2 sm:top-2">
        <JmLogo className="h-11 w-auto cursor-pointer sm:h-14 md:h-16" />
      </div>

      <nav className="flex shrink-0 items-center justify-end gap-1.5 text-xs text-[#2a1a1a] sm:gap-3 md:gap-4">
        <a
          href="#about"
          className="hidden rounded-full px-3 py-2 transition-opacity hover:opacity-60 sm:inline"
        >
          About
        </a>

        <button
          type="button"
          aria-label="Sound"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/30 backdrop-blur-md transition hover:bg-white/50"
        >
          <Volume2 size={15} />
        </button>

        <button
          type="button"
          aria-label="Refresh"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/30 backdrop-blur-md transition hover:bg-white/50"
        >
          <RefreshCw size={15} />
        </button>

        <button
          type="button"
          aria-label="Dark Mode"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/30 backdrop-blur-md transition hover:bg-white/50"
        >
          <Moon size={15} />
        </button>
      </nav>
    </header>
  );
}
