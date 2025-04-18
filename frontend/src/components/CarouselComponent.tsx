import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';

interface CarouselProps<T> {
  data: T[];
  CardComponent: React.ComponentType<{ item: T; index: number }>;
}

export const CarouselComponent = <T,>({
  data,
  CardComponent,
}: CarouselProps<T>) => {
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      const newCurrent = api.selectedScrollSnap() + 1;
      setCurrent(newCurrent);
    });
  }, [api, count]);

  return (
    <div className="mx-auto max-w-xl">
      <Carousel
        opts={{
          loop: true,
        }}
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full"
        data-testid="carousel"
      >
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={index}>
              <CardComponent key={index} item={item} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden cursor-pointer sm:flex" />
        <CarouselNext className="hidden cursor-pointer sm:flex" />
      </Carousel>
      <div className="text-muted-foreground mt-2 flex flex-row justify-between pb-2 text-center align-baseline text-sm">
        Challenge {current} sur {count}
        <div className="flex justify-center gap-2">
          {scrollSnaps.slice(0, count).map((_, index) => (
            <div key={index} className="flex justify-center gap-2">
              <button
                aria-label={`Aller au challenge ${index + 1}`}
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-3 w-3 cursor-pointer rounded-full transition-colors ${
                  index === current - 1 ? 'bg-primary' : 'bg-secondary'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
