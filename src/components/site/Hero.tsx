import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: '/images/hero/files_10197240-2026-07-09T03-01-49-416Z-image.png',
    mobileImage: '/images/mobile/files_10197240-2026-07-09T03-29-46-816Z-image.webp',
    alt: 'Model in luxurious Banarasi silk saree',
  },
  {
    id: 2,
    image: '/images/hero/files_10197240-2026-07-09T03-03-33-384Z-image.png',
    mobileImage: '/images/mobile/files_10197240-2026-07-09T03-30-01-528Z-image.webp',
    alt: 'Elegant Kanjivaram silk draping',
  },
  {
    id: 3,
    image: '/images/hero/files_10197240-2026-07-09T03-04-27-441Z-image.png',
    mobileImage: '/images/mobile/files_10197240-2026-07-09T03-30-17-414Z-image.webp',
    alt: 'Bridal couture saree collection',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isTransitioningRef = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioningRef.current || index === currentSlide) return;
    isTransitioningRef.current = true;
    setCurrentSlide(index);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1600);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, goToSlide]);

  const handlePrev = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section className="relative h-[55vh] min-h-[320px] md:h-[88vh] md:max-h-[800px] md:min-h-[500px] overflow-hidden mt-[104px]">
      {/* Slides */}
      <div
        className="relative w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <picture>
              <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover ${
                  index === currentSlide ? 'animate-ken-burns' : ''
                }`}
                style={{ animationDuration: '7s' }}
                fetchPriority={index === 0 ? 'high' : 'low'}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </picture>
          </div>
        ))}

        {/* Vignette Overlay */}
        <div className="absolute inset-0 vignette-overlay pointer-events-none z-20" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'bg-primary w-8'
                : 'bg-background/60 hover:bg-background'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
