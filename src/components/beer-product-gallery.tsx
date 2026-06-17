"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageGalleryDialog } from "@/components/image-gallery-dialog";

interface BeerProductGalleryProps {
  images: { src: string; alt: string }[];
  beerName: string;
}

export function BeerProductGallery({
  images,
  beerName,
}: BeerProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = images.map((img) => img.src);

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleThumbnailClick = (thumbnailIndex: number) => {
    setCurrentImageIndex(thumbnailIndex);
  };

  const currentAlt = images[currentImageIndex]?.alt ?? beerName;

  return (
    <div className="space-y-4">
      <ImageGalleryDialog
        images={galleryImages}
        currentIndex={currentImageIndex}
        onIndexChange={handleImageChange}
        alt={currentAlt}
      >
        <div className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group">
          <Image
            src={galleryImages[currentImageIndex]}
            alt={currentAlt}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2 text-sm font-medium text-gray-900">
              Click para ampliar
            </div>
          </div>
        </div>
      </ImageGalleryDialog>

      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {images.map((image, index) => {
          const isActive = currentImageIndex === index;
          const thumbnailAlt = image.alt || `${beerName} - Vista ${index + 1}`;

          return (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() => handleThumbnailClick(index)}
              className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-200 border-2 w-full ${
                isActive
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-primary/50"
              }`}
              aria-label={`Ver imagen ${index + 1} de ${beerName}`}
              aria-current={isActive ? "true" : undefined}
            >
              <Image
                src={image.src}
                alt={thumbnailAlt}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
