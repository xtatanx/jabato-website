"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ImageGalleryDialogProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  children: React.ReactNode;
  alt: string;
}

export function ImageGalleryDialog({
  images,
  currentIndex,
  onIndexChange,
  children,
  alt,
}: ImageGalleryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sync carousel with parent's currentIndex when dialog opens
  useEffect(() => {
    if (carouselApi && isOpen) {
      carouselApi.scrollTo(currentIndex, true);
    }
  }, [carouselApi, currentIndex, isOpen]);

  // Listen to carousel slide changes
  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      const index = carouselApi.selectedScrollSnap();
      setCurrentSlide(index);
      onIndexChange(index);
    };

    carouselApi.on("select", handleSelect);
    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi, onIndexChange]);

  const handleThumbnailClick = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="!max-w-none !w-screen !h-screen !p-0 !bg-background/95 backdrop-blur-sm !border-0 !rounded-none !top-0 !left-0 !translate-x-0 !translate-y-0 data-[state=closed]:!zoom-out-100 data-[state=open]:!zoom-in-100 !m-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          Galería de imágenes de {alt}
        </DialogTitle>

        {/* Main container */}
        <div className="relative flex flex-col w-full h-full">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-background/80 backdrop-blur-sm hover:bg-background/90 text-foreground"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar galería"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Main carousel */}
          <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 pb-32">
            <div className="w-full h-full [&_[data-slot='carousel-content']]:h-full">
              <Carousel
                setApi={setCarouselApi}
                opts={{
                  loop: true,
                  startIndex: currentIndex,
                }}
                className="w-full h-full"
              >
                <CarouselContent className="h-full ml-0 [&>div]:h-full [&>div]:ml-0">
                  {images.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className="h-full pl-0 basis-full"
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={image}
                            alt={`${alt} - Vista ${index + 1}`}
                            fill
                            loading="lazy"
                            className="object-contain"
                            sizes="100vw"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 sm:left-4 h-12 w-12 bg-background/80 backdrop-blur-sm hover:bg-background/90 border-0" />
                <CarouselNext className="right-2 sm:right-4 h-12 w-12 bg-background/80 backdrop-blur-sm hover:bg-background/90 border-0" />
              </Carousel>
            </div>
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t">
              <div className="flex items-center justify-center gap-2 p-4 overflow-x-auto">
                <div className="flex gap-2 min-w-fit">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleThumbnailClick(index)}
                      className={cn(
                        "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0",
                        index === currentSlide
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-transparent hover:border-primary/50",
                      )}
                      aria-label={`Ver imagen ${index + 1}`}
                    >
                      <Image
                        src={image}
                        alt={`${alt} - Miniatura ${index + 1}`}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
