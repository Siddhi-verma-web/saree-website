import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard, { type Product } from '../components/site/ProductCard';
import { supabase } from '../lib/supabase';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    if (!q) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or(`name.ilike.%${q}%,fabric.ilike.%${q}%`);

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
        console.error('Error searching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <section className="py-16 md:py-24 pt-32 md:pt-40">
      <div className="container-luxe">
        <div className="mb-10">
          <p className="eyebrow-label mb-2">Search</p>
          <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-6">
            Find Your Saree
          </h1>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or fabric (e.g. Banarasi, Bridal)"
              className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </form>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-20">Searching...</div>
        ) : products.length === 0 && searchParams.get('q') ? (
          <div className="text-center text-muted-foreground py-20">
            No products found for "{searchParams.get('q')}".
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