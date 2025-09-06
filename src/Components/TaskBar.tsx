import React, { useState } from "react";
import { CheckCheckIcon, ImageDownIcon, RefreshCw } from "lucide-react";
import JewelryPurchase from "./OderModal";

type Props = {
  handleDownload: any;
};

export default function TaskBar({ handleDownload }: Props) {
  const [openModal, SetOpenModal] = useState(false);

  return (
    <>
      <header className="flex items-center justify-end px-6 py-2">
        {/* Menu + Icons */}
        <nav className="flex items-center gap-6 text-sm text-[#2a1a1a]">
          {/* Icon 1 */}
          <div className="group relative">
            <button
              onClick={() => SetOpenModal(true)}
              aria-label="Confirm"
              className="text-green-700 hover:opacity-70"
            >
              <CheckCheckIcon size={18} />
            </button>
            <span className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white group-hover:block">
              Confirm
            </span>
          </div>

          {/* Icon 2 */}
          <div className="group relative">
            <button
              aria-label="Refresh"
              className="text-orange-700 hover:opacity-70"
            >
              <RefreshCw size={18} />
            </button>
            <span className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white group-hover:block">
              Refresh
            </span>
          </div>

          {/* Icon 3 */}
          <div className="group relative">
            <button
              aria-label="Download"
              className="text-blue-400 hover:opacity-70"
              onClick={() => handleDownload()}
            >
              <ImageDownIcon size={18} />
            </button>
            <span className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white group-hover:block">
              Download
            </span>
          </div>
        </nav>
      </header>
      <JewelryPurchase openModal={openModal} SetOpenModal={SetOpenModal} />
    </>
  );
}
