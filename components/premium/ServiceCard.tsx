'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon,
  StarIcon
} from '@heroicons/react/24/solid';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  image?: string;
  features: string[];
  rating?: number;
  popular?: boolean;
  onSelect?: () => void;
}

export default function ServiceCard({
  title,
  description,
  price,
  image = '/api/placeholder/400/300',
  features,
  rating = 4.9,
  popular = false,
  onSelect
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateXValue = (mouseY / (rect.height / 2)) * -15;
    const rotateYValue = (mouseX / (rect.width / 2)) * 15;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  // Transform for 3D depth effect
  const transform = useTransform(
    [smoothRotateX, smoothRotateY],
    ([x, y]) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) translateZ(20px)`
  );

  // Shadow transform based on tilt
  const shadowX = useTransform(smoothRotateY, [15, -15], [-20, 20]);
  const shadowY = useTransform(smoothRotateX, [-15, 15], [-20, 20]);
  const shadowBlur = useTransform(smoothRotateX, [-15, 15], [20, 40]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-sm mx-auto"
    >
      {/* Dynamic shadow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-trust-action/20 to-trust-verified/20 rounded-2xl blur-xl"
        style={{
          x: shadowX,
          y: shadowY,
          filter: useTransform(shadowBlur, (b) => `blur(${b}px)`),
        }}
      />

      {/* Main card */}
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/30">
        {/* Popular badge */}
        {popular && (
          <div className="absolute top-4 left-4 z-20">
            <motion.div
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="px-3 py-1 bg-gradient-to-r from-trust-gold to-yellow-400 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg"
            >
              <SparklesIcon className="w-3 h-3" />
              POPULAR
            </motion.div>
          </div>
        )}

        {/* Image section with parallax */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              scale: isHovered ? 1.1 : 1,
              rotateZ: isHovered ? 2 : 0,
              transition: "all 0.5s ease-out"
            }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Rating badge */}
          <div className="absolute bottom-4 right-4 backdrop-blur-md bg-black/30 px-3 py-1 rounded-full flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]" />
            <span className="text-white text-sm font-bold">{rating}</span>
          </div>

          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            initial={{ x: "-200%" }}
            animate={isHovered ? { x: "200%" } : { x: "-200%" }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Content section */}
        <div className="relative p-6" style={{ transformStyle: "preserve-3d" }}>
          {/* Title with 3D depth */}
          <motion.h3
            className="text-2xl font-bold text-trust-deep dark:text-white mb-2"
            style={{
              transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out"
            }}
          >
            {title}
          </motion.h3>

          {/* Price with glow effect */}
          <motion.div
            className="text-3xl font-black bg-gradient-to-r from-trust-action to-trust-verified bg-clip-text text-transparent mb-4"
            style={{
              transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out"
            }}
          >
            {price}
            <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-1">
              /service
            </span>
          </motion.div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
            {description}
          </p>

          {/* Features list with stagger animation */}
          <ul className="space-y-3 mb-6">
            {features.slice(0, 4).map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
                style={{
                  transform: isHovered ? `translateZ(${20 + index * 5}px)` : "translateZ(0px)",
                  transition: "transform 0.3s ease-out"
                }}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-trust-verified to-emerald-400 flex items-center justify-center">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button with magnetic effect */}
          <motion.button
            onClick={onSelect}
            className="relative w-full py-3 bg-gradient-to-r from-trust-action to-trust-action-hover text-white font-bold rounded-xl overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              transform: isHovered ? "translateZ(50px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out"
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Select Service
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>

            {/* Button hover effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-trust-verified to-trust-gold"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ scale: 0, opacity: 1 }}
              whileHover={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </div>

        {/* 3D side faces for depth illusion */}
        <div
          className="absolute inset-y-0 -right-1 w-2 bg-gradient-to-l from-gray-200 to-transparent opacity-50"
          style={{ transform: "rotateY(-90deg) translateZ(10px)" }}
        />
        <div
          className="absolute inset-x-0 -bottom-1 h-2 bg-gradient-to-t from-gray-200 to-transparent opacity-50"
          style={{ transform: "rotateX(90deg) translateZ(10px)" }}
        />
      </div>
    </motion.div>
  );
}