import { useState, useEffect, useCallback, useMemo } from 'react';

interface VirtualizationProps {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export function useVirtualization({
  itemCount,
  itemHeight,
  containerHeight,
  overscan = 5
}: VirtualizationProps) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleEnd = Math.min(
      itemCount - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight)
    );

    const start = Math.max(0, visibleStart - overscan);
    const end = Math.min(itemCount - 1, visibleEnd + overscan);

    return { start, end };
  }, [scrollTop, itemHeight, containerHeight, itemCount, overscan]);

  const totalHeight = itemCount * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const visibleItems = useMemo(() => {
    const items = [];
    for (let i = visibleRange.start; i <= visibleRange.end; i++) {
      items.push(i);
    }
    return items;
  }, [visibleRange]);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
  };
}
