'use client';

import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'rotate';
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}: AnimatedSectionProps) {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    triggerOnce,
  });

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-1000 ease-out';
    const delayClass = delay ? `delay-${delay}` : '';

    if (!isIntersecting) {
      switch (animation) {
        case 'slide-up':
          return `${baseClass} ${delayClass} opacity-0 translate-y-20`;
        case 'slide-left':
          return `${baseClass} ${delayClass} opacity-0 -translate-x-20`;
        case 'slide-right':
          return `${baseClass} ${delayClass} opacity-0 translate-x-20`;
        case 'scale':
          return `${baseClass} ${delayClass} opacity-0 scale-90`;
        case 'rotate':
          return `${baseClass} ${delayClass} opacity-0 rotate-12`;
        case 'fade':
        default:
          return `${baseClass} ${delayClass} opacity-0`;
      }
    } else {
      return `${baseClass} ${delayClass} opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0`;
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}