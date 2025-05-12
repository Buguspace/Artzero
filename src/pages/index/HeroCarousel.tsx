import React, { useState, useEffect } from "react";
import { Circle, CircleDot, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/LazyImage";

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  
  const carouselImages = [
    {
      src: "/public/lovable-uploads/6a7bdcbb-54c8-47e8-a391-83496ce93a1e.png",
      title: "ART SPACE OPENING",
      description: "12/07 - 展览开始于晚上9点"
    },
    {
      src: "/public/lovable-uploads/1ab7c022-ed24-4481-80a9-adf5b9fc804e.png",
      title: "DESIGN STUDIO",
      description: "专业发票设计服务"
    },
    {
      src: "/public/lovable-uploads/0e9013e6-a71e-44c0-9102-f5c2351679f6.png",
      title: "创新网页设计",
      description: "打造现代化的数字体验"
    },
    {
      src: "/public/lovable-uploads/c32fb8b4-fb76-4fda-83f2-0e646a1b5334.png",
      title: "ILLUSTRATION DESIGN CLASS",
      description: "提升您的设计技能"
    },
    {
      src: "/public/lovable-uploads/ae35ad0a-9dc1-4b43-a8ac-2889f0ea73ef.png",
      title: "专业发票设计",
      description: "商业文档设计服务"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 6000); // 自动轮播，每6秒切换一次

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-full bg-LowCarbon Art opacity-5 rounded-lg"></div>
      
      {/* On mobile: match search bar width and center alignment */}
      <div className={`relative ${isMobile ? "mx-auto" : "p-4"} ${isMobile ? "max-w-full" : "max-w-xl"}`}>
        <Carousel 
          className="w-full" 
          setApi={(api) => {
            api?.on("select", () => {
              const selected = api.selectedScrollSnap();
              setCurrentSlide(selected);
            });
          }}
          opts={{
            loop: true,
            startIndex: currentSlide,
          }}
        >
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative overflow-hidden rounded-lg">
                  <AspectRatio ratio={isMobile ? 16/9 : 1/1}>
                    <LazyImage 
                      src={image.src} 
                      alt={image.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white">{image.title}</h3>
                      <p className="text-white/80 text-sm md:text-base">{image.description}</p>
                    </div>
                  </AspectRatio>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 w-8 h-8 md:w-10 md:h-10"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </Button>
          </div>
          
          <div className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 w-8 h-8 md:w-10 md:h-10"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselImages.length)}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </Button>
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2 z-10">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className="focus:outline-none"
                onClick={() => setCurrentSlide(index)}
              >
                {index === currentSlide ? (
                  <CircleDot className="w-4 h-4 text-white" />
                ) : (
                  <Circle className="w-4 h-4 text-white/50" />
                )}
              </button>
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default React.memo(HeroCarousel);
