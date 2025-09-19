'use client';

import { useAnimatedCounter, useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface AnimatedCounterProps {
  endValue: number;
  startValue?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  endValue,
  startValue = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.5,
    triggerOnce: true,
  });

  const animatedValue = useAnimatedCounter(
    endValue,
    duration,
    startValue,
    isIntersecting
  );

  const formatValue = (value: number) => {
    if (decimals > 0) {
      return value.toFixed(decimals);
    }
    return value.toLocaleString();
  };

  return (
    <div ref={ref} className={`counter ${className}`}>
      <span className="font-variant-numeric-tabular">
        {prefix}
        {formatValue(animatedValue)}
        {suffix}
      </span>
    </div>
  );
}