import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { Star } from 'lucide-react';
import { useCart } from '../lib/CartContext';

export default function WishlistPage() {
  const { wishlistItems, addToCart, removeFromWishlist, isLoading } = useCart();

  const formatPrice = (pricePaise: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(pricePaise / 100);
  };

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId, 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[104px]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-[104px]">
      <div className="container-luxe py-12">
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8">
          Your Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-serif text-2xl mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save items you love by clicking the heart icon.</p>
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted mb-4">
                  <Link to={`/product/${item.product_id}`}>
                    <img
                      src={item.products.image_url}
                      alt={item.products.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  {item.products.discount && (
                    <span className="absolute top-3 left-3 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-full">
                      -{item.products.discount}%
                    </span>
                  )}
                  <button
                    onClick={() => removeFromWishlist(item.product_id)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center"
                    aria-label="Remove from wishlist"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>
                <Link to={`/product/${item.product_id}`}>
                  <span className="eyebrow-label">{item.products.fabric}</span>
                  <h3 className="font-serif text-lg font-medium text-foreground line-clamp-1">
                    {item.products.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < 4 ? 'fill-accent text-accent' : 'text-border fill-border'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-serif text-xl text-primary">
                    {formatPrice(item.products.price)}
                  </span>
                  {item.products.old_price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(item.products.old_price)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(item.product_id)}
                  className="w-full mt-3 py-2.5 px-4 bg-primary text-white text-sm font-medium rounded-full hover:bg-secondary transition-colors"
                >
                  Add to Bag
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
