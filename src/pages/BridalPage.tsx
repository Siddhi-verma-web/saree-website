import { useEffect, useState } from 'react';
import ProductCard, { type Product } from '../components/site/ProductCard';
import { supabase } from '../lib/supabase';

export default function BridalPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or('fabric.ilike.%bridal%,name.ilike.%bridal%');

        if (error) throw error;

        const mapped: Product[] = (data || []).map((p: any) => ({
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

        setProducts(mapped);
      } catch (error) {
        console.error('Error fetching bridal products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 md:py-24 pt-32 md:pt-40">
      <div className="container-luxe">
        <div className="mb-10">
          <p className="eyebrow-label mb-2">The Atelier</p>
          <h1 className="text-4xl md:text-5xl font-medium text-foreground">
            Bridal Collection
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Handwoven sarees crafted for your most special day.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-20">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No bridal products found yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}