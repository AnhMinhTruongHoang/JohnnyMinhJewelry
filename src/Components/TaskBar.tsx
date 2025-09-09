import React, { useState } from "react";
import { CameraIcon, CheckCheckIcon, RefreshCw } from "lucide-react";
import JewelryPurchase from "./OderModal";

type Props = {
  handleSceneShot: () => void;
  handleRefresh: () => void;
  getSceneShot: () => string | null; // ✅ thêm
};

export default function TaskBar({
  handleSceneShot,
  handleRefresh,
  getSceneShot,
}: Props) {
  const [openModal, SetOpenModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleOpenConfirm = () => {
    const shot = getSceneShot();
    setCapturedImage(shot); // có thể là null nếu gl chưa sẵn sàng, vẫn OK
    SetOpenModal(true);
  };

  return (
    <>
      <header className="flex items-center justify-end px-6 py-2">
        <nav className="flex items-center gap-6 text-sm text-[#2a1a1a]">
          <div className="group relative">
            <button
              onClick={handleOpenConfirm}
              aria-label="Confirm"
              className="text-green-700 hover:opacity-70"
            >
              <CheckCheckIcon size={18} />
            </button>
            <span className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white group-hover:block">
              <i> Confirm</i>
            </span>
          </div>

          <div className="group relative">
            <button
              aria-label="Refresh"
              className="text-orange-700 hover:opacity-70"
              onClick={handleRefresh}
            >
              <RefreshCw size={18} />
            </button>
            <span className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white group-hover:block">
              <i> Refresh</i>
            </span>
          </div>

          <div className="group relative">
            <button
              aria-label="Download"
              className="text-blue-400 hover:opacity-70"
              onClick={handleSceneShot}
            >
              <CameraIcon size={18} />
            </button>
            <span className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white group-hover:block">
              <i> SceneShot</i>
            </span>
          </div>
        </nav>
      </header>

      {/* Truyền ảnh chụp vào modal */}
      <JewelryPurchase
        openModal={openModal}
        SetOpenModal={SetOpenModal}
        capturedImage={capturedImage}
      />
    </>
  );
}
