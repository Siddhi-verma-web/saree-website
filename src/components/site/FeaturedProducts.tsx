import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard, { type Product } from './ProductCard';
import { supabase } from '../../lib/supabase';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
  .from('products')
  .select('*')
  .limit(50);

        if (error) throw error;

        const mapped: Product[] = (data || []).map((p:any) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          fabric: p.fabric,
          price: p.price,
          oldPrice: p.old_price ?? undefined,
          discount: p.discount ?? undefined,
          rating: p.rating ?? 0,
          reviews: p.reviews_count ?? 0,
          img: p.image_url,
          imgHover: p.image_hover_url ?? p.image_url,
        }));

        mapped.sort(() => Math.random() - 0.5);
setProducts(mapped.slice(0, 8));

        setProducts(mapped);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-blush">
        <div className="container-luxe text-center text-muted-foreground">
          Loading products...
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-blush">
      <div className="container-luxe">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow-label mb-2">Trending This Season</p>
            <h2 className="text-4xl md:text-5xl font-medium text-foreground">
              Coveted Weaves
            </h2>
          </div>
          <a
            href="#collection"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors group"
          >
            View Collection
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