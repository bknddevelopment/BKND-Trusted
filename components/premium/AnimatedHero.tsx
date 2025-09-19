'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

interface AnimatedHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  showStats?: boolean;
  ctaText?: string;
  onCtaClick?: () => void;
}

export default function AnimatedHero({
  title,
  subtitle,
  description,
  backgroundImage = '/api/placeholder/1920/1080',
  showStats = true,
  ctaText = 'Get Started',
  onCtaClick
}: AnimatedHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 400]);
  const textY = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Spring animations for smooth motion
  const springConfig = { damping: 15, stiffness: 100 };
  const backgroundYSpring = useSpring(backgroundY, springConfig);
  const textYSpring = useSpring(textY, springConfig);

  // Mouse parallax effect
  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { value: '50,000+', label: 'Trusted Businesses', delay: 0 },
    { value: '4.8', label: 'Average Rating', delay: 0.1 },
    { value: '2M+', label: 'Verified Reviews', delay: 0.2 },
    { value: '24/7', label: 'Support Available', delay: 0.3 }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-trust-deep to-slate-900">
      {/* Animated background layers */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundYSpring }}
      >
        {/* Gradient mesh background */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-br from-trust-action/20 via-transparent to-trust-verified/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-trust-gold/10 via-transparent to-transparent" />
        </div>

        {/* Animated orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-trust-action/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-trust-verified/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-trust-gold/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920,
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1080,
            }}
            animate={{
              y: -100,
              x: `${Math.random() * 200 - 100}%`,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
        style={{
          y: textYSpring,
          opacity,
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
        }}
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Subtitle with glass effect */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/90 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-trust-verified opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-trust-verified"></span>
                </span>
                {subtitle}
              </span>
            </motion.div>
          )}

          {/* Main title with gradient and animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8"
          >
            <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
              {title.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-4"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {/* CTA Button with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <button
              onClick={onCtaClick}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-trust-action to-trust-verified text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(30,64,175,0.3)]"
            >
              <span className="relative z-10">{ctaText}</span>
              <svg className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>

              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-trust-verified to-trust-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Ripple effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-0 h-0 bg-white/20 rounded-full group-hover:w-[200%] group-hover:h-[200%] transition-all duration-700 ease-out" />
              </div>
            </button>
          </motion.div>

          {/* Stats with stagger animation */}
          {showStats && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                  transition={{ duration: 0.6, delay: 1 + stat.delay }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: isInView ? 1 : 0 }}
                      transition={{ duration: 0.6, delay: 1.2 + stat.delay, type: "spring" }}
                      className="text-3xl md:text-4xl font-black bg-gradient-to-r from-trust-gold to-trust-verified bg-clip-text text-transparent mb-2"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-white/60 font-medium">{stat.label}</div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-trust-action/20 to-trust-verified/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-xs font-medium">Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}