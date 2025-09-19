'use client';

import { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { throttle } from '@/lib/performance';

interface VirtualListProps<T> {
  items: T[];
  height: number; // Container height
  itemHeight: number | ((index: number) => number); // Fixed or dynamic height
  renderItem: (item: T, index: number) => ReactNode;
  overscan?: number; // Number of items to render outside visible area
  className?: string;
  onScroll?: (scrollTop: number) => void;
  estimatedItemHeight?: number; // For dynamic heights
}

export default function VirtualList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  overscan = 3,
  className = '',
  onScroll,
  estimatedItemHeight = 100
}: VirtualListProps<T>) {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Calculate item heights
  const getItemHeight = useCallback(
    (index: number) => {
      if (typeof itemHeight === 'function') {
        return itemHeight(index);
      }
      return itemHeight;
    },
    [itemHeight]
  );

  // Calculate total height
  const totalHeight = items.reduce((acc, _, index) => {
    return acc + getItemHeight(index);
  }, 0);

  // Calculate visible range
  const calculateVisibleRange = useCallback(() => {
    let accumulatedHeight = 0;
    let startIndex = 0;
    let endIndex = items.length - 1;

    // Find start index
    for (let i = 0; i < items.length; i++) {
      const itemH = getItemHeight(i);
      if (accumulatedHeight + itemH > scrollTop) {
        startIndex = Math.max(0, i - overscan);
        break;
      }
      accumulatedHeight += itemH;
    }

    // Find end index
    accumulatedHeight = 0;
    for (let i = startIndex; i < items.length; i++) {
      if (accumulatedHeight > scrollTop + height) {
        endIndex = Math.min(items.length - 1, i + overscan);
        break;
      }
      accumulatedHeight += getItemHeight(i);
    }

    return { startIndex, endIndex };
  }, [items.length, scrollTop, height, overscan, getItemHeight]);

  const { startIndex, endIndex } = calculateVisibleRange();

  // Calculate offset for visible items
  const getItemOffset = useCallback(
    (index: number) => {
      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += getItemHeight(i);
      }
      return offset;
    },
    [getItemHeight]
  );

  // Throttled scroll handler
  const handleScroll = useCallback(
    throttle((e: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = e.currentTarget.scrollTop;
      setScrollTop(scrollTop);
      onScroll?.(scrollTop);

      // Set scrolling state
      setIsScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    }, 16), // ~60fps
    [onScroll]
  );

  // Scroll to item programmatically
  const scrollToItem = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      if (scrollElementRef.current) {
        const offset = getItemOffset(index);
        scrollElementRef.current.scrollTo({
          top: offset,
          behavior
        });
      }
    },
    [getItemOffset]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Visible items to render
  const visibleItems = items.slice(startIndex, endIndex + 1);

  return (
    <div
      ref={scrollElementRef}
      className={`virtual-list-container ${className}`}
      style={{
        height,
        overflow: 'auto',
        position: 'relative',
        contain: 'strict',
        willChange: isScrolling ? 'scroll-position' : 'auto'
      }}
      onScroll={handleScroll}
    >
      {/* Total height maintainer */}
      <div
        style={{
          height: totalHeight,
          position: 'relative',
          pointerEvents: isScrolling ? 'none' : 'auto'
        }}
      >
        {/* Rendered items */}
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;
          const offset = getItemOffset(actualIndex);
          const itemH = getItemHeight(actualIndex);

          return (
            <div
              key={actualIndex}
              className="virtual-list-item"
              style={{
                position: 'absolute',
                top: offset,
                left: 0,
                right: 0,
                height: itemH,
                contain: 'layout style paint',
                willChange: isScrolling ? 'transform' : 'auto',
                transform: 'translateZ(0)' // Force GPU layer
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>

      {/* Loading indicator for scrolling */}
      {isScrolling && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
          Scrolling...
        </div>
      )}
    </div>
  );
}

// Specialized virtual list for business cards
interface VirtualBusinessListProps {
  businesses: any[];
  height?: number;
  itemHeight?: number;
  className?: string;
}

export function VirtualBusinessList({
  businesses,
  height = 600,
  itemHeight = 250,
  className = ''
}: VirtualBusinessListProps) {
  return (
    <VirtualList
      items={businesses}
      height={height}
      itemHeight={itemHeight}
      className={className}
      overscan={2}
      renderItem={(business, index) => (
        <div className="p-2 h-full">
          {/* Lazy load business card component */}
          <div className="bg-white rounded-lg shadow-lg h-full p-4">
            <h3 className="font-bold text-lg mb-2">{business.name}</h3>
            <p className="text-gray-600 text-sm">{business.category}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">{business.rating}</span>
              <span className="text-gray-500 text-sm">
                ({business.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      )}
    />
  );
}

// Intersection observer based lazy loading list
interface LazyListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  loadMoreThreshold?: number; // Distance from bottom to trigger load
  onLoadMore?: () => void;
  className?: string;
  itemClassName?: string;
}

export function LazyList<T>({
  items,
  renderItem,
  loadMoreThreshold = 200,
  onLoadMore,
  className = '',
  itemClassName = ''
}: LazyListProps<T>) {
  const observerRef = useRef<IntersectionObserver>();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadMoreRef.current && onLoadMore) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onLoadMore();
          }
        },
        {
          rootMargin: `${loadMoreThreshold}px`
        }
      );

      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onLoadMore, loadMoreThreshold]);

  return (
    <div className={`lazy-list ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`lazy-list-item ${itemClassName}`}
          style={{
            contain: 'layout style paint',
            contentVisibility: 'auto'
          }}
        >
          {renderItem(item, index)}
        </div>
      ))}
      {onLoadMore && <div ref={loadMoreRef} className="h-1" />}
    </div>
  );
}