
import React, { useState, useRef, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GalleryHorizontal, Images } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ZoomableImage from "@/components/ZoomableImage";

interface ProductImagesCarouselProps {
  images: string[];
  title: string;
}

const ProductImagesCarousel: React.FC<ProductImagesCarouselProps> = ({ 
  images,
  title 
}) => {
  const [viewMode, setViewMode] = useState<"carousel" | "gallery">("carousel");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Update current index when carousel changes
  useEffect(() => {
    if (!api) {
      return;
    }

    const onChange = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onChange);
    return () => {
      api.off("select", onChange);
    };
  }, [api]);

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "carousel" | "gallery")}>
          <div className="bg-gray-50 p-2 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {images.length > 1
                ? `${images.length} 张图片 (点击图片可查看大图)`
                : "1 张图片 (点击图片可查看大图)"}
            </div>
            <TabsList className="grid w-[160px] grid-cols-2">
              <TabsTrigger value="carousel" className="flex items-center gap-1">
                <Images size={16} />
                <span>轮播</span>
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex items-center gap-1">
                <GalleryHorizontal size={16} />
                <span>网格</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="carousel" className="mt-0">
            <div className="flex flex-col">
              <Carousel 
                className="w-full" 
                setApi={setApi}
              >
                <CarouselContent>
                  {images.map((image: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="aspect-video w-full h-full flex items-center justify-center bg-gray-100">
                        <ZoomableImage
                          src={image}
                          alt={`${title} - 图片 ${index + 1}`}
                          className="max-h-[400px] w-full"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>

              {/* Thumbnails below main image */}
              {images.length > 1 && (
                <div className="py-2 px-2">
                  <ScrollArea className="w-full">
                    <div className="flex gap-2 py-1">
                      {images.map((image: string, index: number) => (
                        <div 
                          key={index}
                          onClick={() => handleThumbnailClick(index)}
                          className={`
                            relative cursor-pointer flex-shrink-0 w-16 h-16 overflow-hidden rounded border-2
                            ${index === current ? 'border-artflow-blue' : 'border-transparent'}
                          `}
                        >
                          <img
                            src={image}
                            alt={`缩略图 ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
              {images.map((image: string, index: number) => (
                <div 
                  key={index} 
                  className="relative aspect-square overflow-hidden rounded-md"
                >
                  <ZoomableImage
                    src={image}
                    alt={`${title} - 图片 ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProductImagesCarousel;
