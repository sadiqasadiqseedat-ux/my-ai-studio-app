import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface ImageLightboxProps {
  photo: GalleryPhoto | null;
  photos: GalleryPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: GalleryPhoto) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  photo,
  photos,
  onClose,
  onSelectPhoto,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!photo) return;
      const currentIndex = photos.findIndex((p) => p.id === photo.id);
      if (e.key === 'ArrowRight' && currentIndex < photos.length - 1) {
        onSelectPhoto(photos[currentIndex + 1]);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectPhoto(photos[currentIndex - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, photos, onClose, onSelectPhoto]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      onSelectPhoto(photos[currentIndex - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < photos.length - 1) {
      onSelectPhoto(photos[currentIndex + 1]);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next buttons */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-40 hidden sm:block"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentIndex < photos.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-40 hidden sm:block"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="relative aspect-video sm:aspect-16/10 bg-black flex items-center justify-center overflow-hidden">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-900 border-t border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
              <span>{photo.category}</span>
              <span className="text-stone-500">·</span>
              <span className="flex items-center gap-1 text-stone-400">
                <Calendar className="w-3 h-3" />
                {photo.date}
              </span>
            </div>
            <h4 className="font-serif text-lg font-bold text-white">{photo.title}</h4>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">{photo.caption}</p>
          </div>

          <div className="text-xs text-stone-400 shrink-0">
            Image {currentIndex + 1} of {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
};
