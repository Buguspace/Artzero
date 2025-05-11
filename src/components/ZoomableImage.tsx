
import React, { useState, useRef, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Move } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, alt, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  // Reset zoom and position when dialog opens
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className={`cursor-zoom-in ${className || ""}`}>
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-contain" 
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh] w-auto h-auto p-0 overflow-hidden">
        <div className="relative w-full h-full bg-black/80">
          {/* Controls */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={handleZoomIn}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <ZoomIn size={18} />
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={handleZoomOut}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <ZoomOut size={18} />
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
              disabled
            >
              <Move size={18} />
            </Button>
          </div>

          {/* Zoomable image container */}
          <div 
            ref={imageRef}
            className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ 
              touchAction: "none" 
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out'
              }}
            >
              <img 
                src={src} 
                alt={alt}
                className="max-w-[80vw] max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZoomableImage;
