import { useEffect, useRef, useState, RefObject } from 'react';

interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const elementRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Skip if already triggered and triggerOnce is true
    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;

        if (isCurrentlyIntersecting && !hasTriggered) {
          setIsIntersecting(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(isCurrentlyIntersecting);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce, hasTriggered]);

  return [elementRef, isIntersecting];
}

// Hook for multiple elements
export function useMultipleIntersectionObserver(
  elements: RefObject<HTMLElement>[],
  options: IntersectionObserverOptions = {}
): Map<HTMLElement, boolean> {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const [intersectingMap, setIntersectingMap] = useState<Map<HTMLElement, boolean>>(new Map());
  const triggeredElements = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIntersectingMap((prevMap) => {
          const newMap = new Map(prevMap);

          entries.forEach((entry) => {
            const element = entry.target as HTMLElement;
            const isCurrentlyIntersecting = entry.isIntersecting;

            if (triggerOnce && triggeredElements.current.has(element)) {
              return;
            }

            if (isCurrentlyIntersecting) {
              newMap.set(element, true);
              if (triggerOnce) {
                triggeredElements.current.add(element);
              }
            } else if (!triggerOnce) {
              newMap.set(element, false);
            }
          });

          return newMap;
        });
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    elements.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [elements, threshold, root, rootMargin, triggerOnce]);

  return intersectingMap;
}

// Hook for animating counters
export function useAnimatedCounter(
  endValue: number,
  duration: number = 2000,
  startValue: number = 0,
  isVisible: boolean = true
): number {
  const [value, setValue] = useState(startValue);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (!isVisible) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

      setValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setValue(endValue);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [endValue, duration, startValue, isVisible]);

  return value;
}

// Hook for parallax scrolling
export function useParallax(speed: number = 0.5): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setOffset(scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return offset;
}