'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageGalleryDialog } from '@/components/image-gallery-dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface BeerProductGalleryProps {
  thumbnails: string[];
  beerName: string;
}

export function BeerProductGallery({
  thumbnails,
  beerName,
}: BeerProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use thumbnails directly for the gallery, don't deduplicate
  // This allows showing all images even if some URLs are repeated
  const galleryImages = thumbnails;

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleThumbnailClick = (thumbnailIndex: number) => {
    setCurrentImageIndex(thumbnailIndex);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <ImageGalleryDialog
        images={galleryImages}
        currentIndex={currentImageIndex}
        onIndexChange={handleImageChange}
        alt={beerName}
      >
        <div className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group">
          <Image
            src={galleryImages[currentImageIndex]}
            alt={beerName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2 text-sm font-medium text-gray-900">
              Click para ampliar
            </div>
          </div>
        </div>
      </ImageGalleryDialog>

      {/* Thumbnails */}
      <Carousel className="w-full relative">
        <CarouselContent className="-ml-2 md:-ml-4">
          {thumbnails.map((thumbnail, index) => {
            const isActive = currentImageIndex === index;

            return (
              <CarouselItem
                key={`${thumbnail}-${index}`}
                className="pl-2 md:pl-4 basis-1/4"
              >
                <button
                  type="button"
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-200 border-2 w-full ${
                    isActive
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-transparent hover:border-primary/50'
                  }`}
                  aria-label={`Ver imagen ${index + 1} de ${beerName}`}
                >
                  <Image
                    src={thumbnail}
                    alt={`${beerName} - Vista ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
                  />
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 bg-background/90 hover:bg-background border border-border/50 shadow-sm" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 bg-background/90 hover:bg-background border border-border/50 shadow-sm" />
      </Carousel>
    </div>
  );
}
