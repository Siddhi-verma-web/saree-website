import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard, { type Product } from './ProductCard';
import { supabase } from '../../lib/supabase';

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Get products 4-9 for "new arrivals"
        const { data, error } = await supabase
          .from('products')
          .select('id, name, slug, fabric, price, old_price, discount, rating, reviews_count, image_url, image_hover_url')
          .range(3, 8);

        if (error) throw error;

        if (data) {
          setProducts(
            data.map((p) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              fabric: p.fabric,
              price: p.price,
              oldPrice: p.old_price,
              discount: p.discount,
              rating: Number(p.rating),
              reviews: p.reviews_count,
              img: p.image_url,
              imgHover: p.image_hover_url,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <section id="new-arrivals" className="py-16 md:py-24">
        <div className="container-luxe">
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="new-arrivals" className="py-16 md:py-24">
      <div className="container-luxe">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow-label mb-2">Freshly Woven</p>
            <h2 className="text-4xl md:text-5xl font-medium text-foreground">
              New Arrivals
            </h2>
          </div>
          <a
            href="#new"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors group"
          >
            Explore All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
