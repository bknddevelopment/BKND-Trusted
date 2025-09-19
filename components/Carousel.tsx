'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CarouselProps {
  items: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  className?: string;
}

export default function Carousel({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  showControls = true,
  className = '',
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Update current index based on scroll position
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = carousel.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isUserInteracting) return;

    const interval = setInterval(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const nextIndex = (currentIndex + 1) % items.length;
      scrollToIndex(nextIndex);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, items.length, isUserInteracting]);

  const scrollToIndex = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const itemWidth = carousel.offsetWidth;
    carousel.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth',
    });
  };

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % items.length;
    scrollToIndex(newIndex);
  };

  const handleMouseEnter = () => setIsUserInteracting(true);
  const handleMouseLeave = () => setIsUserInteracting(false);
  const handleTouchStart = () => setIsUserInteracting(true);
  const handleTouchEnd = () => setIsUserInteracting(false);

  return (
    <div
      className={`carousel-container relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Track */}
      <div
        ref={carouselRef}
        className="carousel-track"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            {item}
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {showControls && items.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur hover:bg-white rounded-full shadow-lg transition-all hover-lift group"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-6 h-6 text-trust-deep group-hover:text-trust-action transition-colors" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur hover:bg-white rounded-full shadow-lg transition-all hover-lift group"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-6 h-6 text-trust-deep group-hover:text-trust-action transition-colors" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`carousel-indicator ${
                index === currentIndex ? 'active' : ''
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}