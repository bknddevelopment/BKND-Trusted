'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import Image from 'next/image';
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckBadgeIcon,
  ChatBubbleBottomCenterTextIcon as QuoteIcon
} from '@heroicons/react/24/solid';

interface Testimonial {
  id: string;
  author: {
    name: string;
    avatar: string;
    location: string;
    verified: boolean;
  };
  rating: number;
  date: string;
  content: string;
  businessName: string;
  service: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
}

export default function TestimonialSlider({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag controls
  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [-200, 200], [1, -1]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, autoPlay, autoPlayInterval, testimonials.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      handlePrev();
    } else if (info.offset.x < -100) {
      handleNext();
    }

    // Reset interval after manual navigation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);

    // Reset interval after manual navigation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
    }
  };

  // Variants for slide animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        rotateY: { duration: 0.5 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        rotateY: { duration: 0.5 }
      }
    })
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 transition-all duration-300 ${
              i < rating
                ? 'text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-trust-action/5 via-transparent to-trust-verified/5 rounded-3xl blur-3xl" />

      {/* Main slider container */}
      <div className="relative">
        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Previous testimonial"
        >
          <ChevronLeftIcon className="w-6 h-6 text-trust-deep dark:text-white group-hover:text-trust-action transition-colors" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Next testimonial"
        >
          <ChevronRightIcon className="w-6 h-6 text-trust-deep dark:text-white group-hover:text-trust-action transition-colors" />
        </button>

        {/* Testimonial cards */}
        <div className="relative h-[400px] md:h-[350px] overflow-hidden rounded-2xl">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{ x: dragX }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <div className="relative h-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 p-8 shadow-xl">
                {/* Quote decoration */}
                <div className="absolute top-4 right-4 text-trust-action/10">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Author info */}
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="relative"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/50 shadow-lg">
                      <Image
                        src={testimonials[currentIndex].author.avatar}
                        alt={testimonials[currentIndex].author.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    {testimonials[currentIndex].author.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-trust-verified rounded-full p-1 shadow-md">
                        <CheckBadgeIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>

                  <div className="flex-1">
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl font-bold text-trust-deep dark:text-white flex items-center gap-2"
                    >
                      {testimonials[currentIndex].author.name}
                      {testimonials[currentIndex].author.verified && (
                        <span className="text-xs px-2 py-1 bg-trust-verified/10 text-trust-verified rounded-full font-medium">
                          Verified
                        </span>
                      )}
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {testimonials[currentIndex].author.location}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-3 mt-2"
                    >
                      {renderStars(testimonials[currentIndex].rating)}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonials[currentIndex].date}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Testimonial content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic">
                    "{testimonials[currentIndex].content}"
                  </p>
                </motion.div>

                {/* Service info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Service provided by</p>
                    <p className="font-bold text-trust-deep dark:text-white">
                      {testimonials[currentIndex].businessName}
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-trust-action/10 to-trust-verified/10 rounded-full">
                    <p className="text-sm font-medium text-trust-action">
                      {testimonials[currentIndex].service}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        {showIndicators && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group relative p-1"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <motion.div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-trust-action to-trust-verified'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-trust-action/20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}