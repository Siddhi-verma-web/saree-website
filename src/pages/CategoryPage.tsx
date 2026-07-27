import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard, { type Product } from '../components/site/ProductCard';
import { supabase } from '../lib/supabase';

export default function CategoryPage() {
  const { fabricSlug } = useParams<{ fabricSlug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fabricName = (fabricSlug || '').replace(/-/g, ' ');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .ilike('fabric', `%${fabricName}%`);

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
        console.error('Error fetching category products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [fabricName]);

  return (
    <section className="py-16 md:py-24 pt-32 md:pt-40">
      <div className="container-luxe">
        <div className="mb-10">
          <p className="eyebrow-label mb-2">Shop by Weave</p>
          <h1 className="text-4xl md:text-5xl font-medium text-foreground capitalize">
            {fabricName}
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-20">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            <p className="mb-4">No products found in this category yet.</p>
            <Link to="/" className="text-primary underline">Back to Home</Link>
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