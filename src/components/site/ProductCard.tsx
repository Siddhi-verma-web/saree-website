import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Plus } from 'lucide-react';
import { Star } from 'lucide-react';
import { useCart } from '../../lib/CartContext';

export interface Product {
  id: string;
  name: string;
  slug?: string;
  fabric: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  img: string;
  imgHover: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useCart();

  const isWishlisted = isInWishlist(product.id);

  const formatPrice = (pricePaise: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(pricePaise / 100);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isWishlisted) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product.id);
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  const productSlug = product.slug || product.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={`/product/${productSlug}`} className="group block">
      {/* Image Container */}
      <div
        className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted card-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Primary Image */}
        <img
          src={product.img}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />
        {/* Hover Image */}
       {/* Product Image with Zoom on Hover */}
<img
  src={product.img}
  alt={product.name}
  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
    isHovered ? 'scale-110' : 'scale-100'
  }`}
  loading="lazy"
/>
        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-3 left-3 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-full z-10">
            -{product.discount}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
            isWishlisted
              ? 'bg-secondary text-white'
              : 'bg-white text-foreground hover:bg-secondary hover:text-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Slide-up Action Bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500 z-10 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 bg-primary text-white text-sm font-medium rounded-full flex items-center justify-center gap-2 hover:bg-secondary transition-colors duration-300"
            >
              <Plus className="w-4 h-4" />
              Add to Bag
            </button>
            <button
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-300"
              aria-label="Quick view"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 px-1">
        {/* Fabric Tag */}
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
          {product.fabric}
        </span>

        {/* Product Name */}
        <h3 className="font-serif text-lg font-medium text-foreground mt-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-accent text-accent'
                    : 'text-border fill-border'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-serif text-xl font-medium text-primary">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
