'use client';

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setActiveImageIndex(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = 'unset';
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-gray-400">No Image</div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image with Navigation Arrows */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group cursor-pointer" onClick={openFullscreen}>
          <Image
            src={images[activeImageIndex]}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={true}
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Fullscreen Icon */}
          <div className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Maximize2 size={18} className="text-white" />
          </div>

          {/* Navigation Arrows - Only show if more than 1 image */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Next image"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
              {activeImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Images */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => selectImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 transition-all ${index === activeImageIndex
                    ? 'ring-2 ring-primary ring-offset-2'
                    : 'opacity-70 hover:opacity-100'
                  }`}
              >
                <Image
                  src={image}
                  alt={`${title} - slika ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 15vw"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200"
          onClick={closeFullscreen}
        >
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-colors"
            aria-label="Close fullscreen"
          >
            <X size={24} className="text-white" />
          </button>

          {/* Main Image Container */}
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
              <Image
                src={images[activeImageIndex]}
                alt={title}
                fill
                className="object-contain"
                sizes="100vw"
                priority={true}
              />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 transition-colors z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}