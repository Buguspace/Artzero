import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
  pullDistance?: number;
  resistance?: number;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  className = '',
  pullDistance = 80,
  resistance = 2.5,
}) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling) return;
    
    currentY.current = e.touches[0].clientY;
    const pull = Math.max(0, (currentY.current - startY.current) / resistance);
    setPullProgress(Math.min(pull / pullDistance, 1));
    
    if (pull > pullDistance) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling) return;
    
    setIsPulling(false);
    if (pullProgress >= 1) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullProgress(0);
      }
    } else {
      setPullProgress(0);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling, pullProgress]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-auto ${className}`}
      style={{
        touchAction: 'pan-y',
      }}
    >
      <div
        className="absolute left-0 right-0 flex items-center justify-center transition-transform duration-200"
        style={{
          top: -40,
          transform: `translateY(${pullProgress * 40}px)`,
        }}
      >
        {isRefreshing ? (
          <Loader2 className="w-6 h-6 animate-spin text-lowcarbonart-blue" />
        ) : (
          <div className="w-6 h-6 border-2 border-lowcarbonart-blue rounded-full">
            <div
              className="w-full h-full rounded-full bg-lowcarbonart-blue"
              style={{
                transform: `scaleY(${pullProgress})`,
                transformOrigin: 'top',
              }}
            />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default React.memo(PullToRefresh); 