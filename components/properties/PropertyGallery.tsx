"use client";

import Image from "next/image";
import { useState } from "react";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [selectedImage, setSelectedImage] = useState(images[0] ?? "");

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[1.75rem] border border-[#E6E0D2] bg-white p-2 shadow-[0_10px_30px_rgba(31,41,51,0.04)]">
        <div className="relative h-[420px] overflow-hidden rounded-[1.4rem]">
          {selectedImage ? (
            <Image src={selectedImage} alt={title} fill unoptimized className="object-cover" sizes="(max-width: 768px) 100vw, 70vw" />
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`relative h-24 overflow-hidden rounded-2xl border-2 ${
              selectedImage === image ? "border-[#1B5E3C]" : "border-transparent"
            }`}
          >
            <Image src={image} alt={`${title} ${index + 1}`} fill unoptimized className="object-cover" sizes="(max-width: 768px) 33vw, 12vw" />
          </button>
        ))}
      </div>
    </div>
  );
}
