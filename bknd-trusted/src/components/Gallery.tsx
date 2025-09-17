import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Download, Share2, Maximize2, ArrowUpDown } from 'lucide-react';
import { GalleryImage } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryProps {
  images: GalleryImage[];
  businessName: string;
  showTypeFilter?: boolean;
  enableDownload?: boolean;
  variant?: 'grid' | 'carousel' | 'before-after';
}

export const Gallery: React.FC<GalleryProps> = ({
  images,
  businessName,
  showTypeFilter = true,
  enableDownload = false,
  variant = 'grid'
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterType, setFilterType] = useState<'all' | 'before' | 'after' | 'work'>('all');
  const [beforeAfterSliderPosition, setBeforeAfterSliderPosition] = useState(50);

  const filteredImages = filterType === 'all'
    ? images
    : images.filter(img => img.type === filterType);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setBeforeAfterSliderPosition(Math.min(100, Math.max(0, percentage)));
  };

  // Grid View
  const GridView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredImages.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md"
          onClick={() => openLightbox(image, index)}
        >
          <img
            src={image.url}
            alt={image.caption || `${businessName} work`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-8 h-8 text-white" />
            </div>
          </div>
          {image.type !== 'work' && (
            <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold ${
              image.type === 'before'
                ? 'bg-red-500 text-white'
                : 'bg-green-500 text-white'
            }`}>
              {image.type.charAt(0).toUpperCase() + image.type.slice(1)}
            </div>
          )}
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white text-sm truncate">{image.caption}</p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  // Carousel View
  const CarouselView = () => (
    <div className="relative">
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={filteredImages[currentIndex]?.id}
            src={filteredImages[currentIndex]?.url}
            alt={filteredImages[currentIndex]?.caption || `${businessName} work`}
            className="w-full h-full object-contain"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Navigation */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {filteredImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Caption */}
      {filteredImages[currentIndex]?.caption && (
        <div className="mt-4 text-center">
          <p className="text-gray-700">{filteredImages[currentIndex].caption}</p>
          {filteredImages[currentIndex].date && (
            <p className="text-sm text-gray-500 mt-1">
              {new Date(filteredImages[currentIndex].date!).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {/* Thumbnails */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {filteredImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              index === currentIndex
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );

  // Before/After Comparison View
  const BeforeAfterView = () => {
    const beforeImages = images.filter(img => img.type === 'before');
    const afterImages = images.filter(img => img.type === 'after');
    const pairs = beforeImages.slice(0, Math.min(beforeImages.length, afterImages.length));

    if (pairs.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          <ArrowUpDown className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No before/after images available</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {pairs.map((beforeImage, index) => {
          const afterImage = afterImages[index];
          return (
            <div key={beforeImage.id} className="relative">
              <div
                className="relative h-96 rounded-lg overflow-hidden cursor-col-resize"
                onMouseMove={handleSliderMove}
                onTouchMove={(e) => {
                  const touch = e.touches[0];
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = touch.clientX - rect.left;
                  const percentage = (x / rect.width) * 100;
                  setBeforeAfterSliderPosition(Math.min(100, Math.max(0, percentage)));
                }}
              >
                {/* After Image (Full) */}
                <img
                  src={afterImage.url}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Before Image (Clipped) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${beforeAfterSliderPosition}%` }}
                >
                  <img
                    src={beforeImage.url}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ width: `${(100 / beforeAfterSliderPosition) * 100}%` }}
                  />
                </div>

                {/* Slider Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                  style={{ left: `${beforeAfterSliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                    <ArrowUpDown className="w-4 h-4 rotate-90" />
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Before
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  After
                </div>
              </div>

              {/* Caption */}
              {(beforeImage.caption || afterImage.caption) && (
                <div className="mt-2 text-center text-gray-700">
                  {beforeImage.caption || afterImage.caption}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {businessName} Gallery
        </h3>

        {/* Filter Tabs */}
        {showTypeFilter && variant !== 'before-after' && (
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
            {['all', 'before', 'after', 'work'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as typeof filterType)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  filterType === type
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Gallery Content */}
      {variant === 'grid' && <GridView />}
      {variant === 'carousel' && <CarouselView />}
      {variant === 'before-after' && <BeforeAfterView />}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 z-10">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="font-semibold">{businessName}</p>
                    {filteredImages[currentIndex]?.caption && (
                      <p className="text-sm opacity-90">
                        {filteredImages[currentIndex].caption}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {enableDownload && (
                      <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    )}
                    <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={closeLightbox}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Lightbox Image */}
              <img
                src={filteredImages[currentIndex]?.url}
                alt={filteredImages[currentIndex]?.caption || ''}
                className="max-w-full max-h-[80vh] object-contain"
              />

              {/* Lightbox Navigation */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {filteredImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};