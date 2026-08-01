import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';


 const categories = [
  { name: 'Banarasi', image: '/images/products/box1.webp', fabricSlug: 'banarasi' },
  { name: 'Kanjivaram', image: '/images/products/box2.webp', fabricSlug: 'kanjivaram' },
  { name: 'Chiffon', image: '/images/products/box3.webp', fabricSlug: 'chiffon' },
  { name: 'Organza', image: '/images/products/box4.webp', fabricSlug: 'organza' },
  { name: 'Cotton', image: '/images/products/img21.webp', fabricSlug: 'cotton' },
  { name: 'Bridal', image: '/images/products/img22.webp', fabricSlug: 'bridal' },
  { name: 'Linen', image: '/images/products/img20.webp', fabricSlug: 'linen' },
  { name: 'Designer', image: '/images/products/img19.webp', fabricSlug: 'designer' },
];

export default function ShopByWeave() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categoryItem = (category: typeof categories[0], index: number) => (
    <Link
      key={category.name}
     to={`/category/${category.fabricSlug}`}
      className={`group text-center flex-shrink-0 opacity-0 ${
        isVisible ? 'animate-fade-up' : ''
      }`}
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary transition-all duration-300">
        <img
          src={category.image}
          alt={`${category.name} saree fabric`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          width="112"
          height="112"
        />
      </div>
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
        {category.name}
      </span>
    </Link>
  );

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container-luxe">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="eyebrow-label mb-3">Shop by Weave</p>
          <h2 className="text-4xl md:text-5xl font-medium text-foreground">
            The Curated Edit
          </h2>
        </div>

        {/* Mobile: horizontal scroll slider */}
        <div className="sm:hidden">
          <div
            className="flex gap-6 overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {categories.map((category, index) => (
              <div key={category.name} style={{ scrollSnapAlign: 'start' }}>
                {categoryItem(category, index)}
              </div>
            ))}
          </div>
          {/* Scroll hint fade */}
          <p className="text-center text-xs text-muted-foreground mt-2 tracking-wide">
            Scroll to explore
          </p>
        </div>

        {/* Tablet+: grid layout */}
        <div className="hidden sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8">
          {categories.map((category, index) => categoryItem(category, index))}
        </div>
      </div>
    </section>
  );
}
