"use client";

import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayImages = images.length > 0 ? images : ["/images/placeholder.jpg"];

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral)]/5">
        <img
          src={displayImages[activeIndex]}
          alt={`${productName} - Image ${activeIndex + 1}`}
          className="h-full w-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
        />
      </div>
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {displayImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-[var(--radius-sm)] border-2 transition-colors ${
                i === activeIndex
                  ? "border-[var(--color-primary)]"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
