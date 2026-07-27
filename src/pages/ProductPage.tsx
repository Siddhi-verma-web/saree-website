import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Minus, Plus, Truck, RotateCcw, ShieldCheck, ChevronRight } from 'lucide-react';
import { Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../lib/CartContext';
import ProductCard from '../components/site/ProductCard';
import type { Product } from '../components/site/ProductCard';

interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  fabric: string;
  price: number;
  old_price: number | null;
  discount: number | null;
  rating: number;
  reviews_count: number;
  image_url: string;
  image_hover_url: string;
  images: string[];
  in_stock: boolean;
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isInCart,
  } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      setIsLoading(true);

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setProduct(data as ProductDetail);

          // Fetch related products (same fabric, excluding current)
          const { data: related } = await supabase
            .from('products')
            .select('id, name, fabric, price, old_price, discount, rating, reviews_count, image_url, image_hover_url')
            .eq('fabric', data.fabric)
            .neq('id', data.id)
            .limit(4);

          if (related) {
            setRelatedProducts(
              related.map((p) => ({
                id: p.id,
                name: p.name,
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
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const formatPrice = (pricePaise: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(pricePaise / 100);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAddingToCart(true);
    try {
      await addToCart(product.id, quantity);
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 3000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = async () => {
    if (!product) return;
    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product.id);
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
          <Link to="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [product.image_url, product.image_hover_url];

  return (
    <div className="pt-[104px]">
      {/* Breadcrumb */}
      <div className="container-luxe py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/" className="hover:text-primary transition-colors">Sarees</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <section className="container-luxe py-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-muted rounded-2xl overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-full">
                  -{product.discount}%
                </span>
              )}
              <button
                onClick={handleWishlistToggle}
                className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isInWishlist(product.id)
                    ? 'bg-secondary text-white'
                    : 'bg-white text-foreground hover:bg-secondary hover:text-white'
                }`}
                aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden ring-2 transition-all ${
                    selectedImage === idx ? 'ring-primary' : 'ring-border hover:ring-primary/50'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            <span className="eyebrow-label">{product.fabric}</span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mt-2 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-accent text-accent'
                        : 'text-border fill-border'
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating} ({product.reviews_count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-serif text-3xl lg:text-4xl font-medium text-primary">
                {formatPrice(product.price)}
              </span>
              {product.old_price && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.old_price)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className={`flex items-center gap-2 mb-6 ${product.in_stock ? 'text-green-600' : 'text-secondary'}`}>
              <span className={`w-3 h-3 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-secondary'}`} />
              <span className="font-medium">{product.in_stock ? 'In Stock' : 'Out of Stock'}</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors rounded-l-full"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors rounded-r-full"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock || isAddingToCart}
                className={`flex-1 py-4 px-8 rounded-full font-medium text-sm tracking-wide transition-all duration-300 ${
                  product.in_stock
                    ? 'bg-primary text-white hover:bg-secondary hover:shadow-luxe'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                {isAddingToCart ? 'Adding...' : isInCart(product.id) ? 'Add More to Bag' : 'Add to Bag'}
              </button>
              <button
                onClick={handleWishlistToggle}
                className="sm:w-auto px-8 py-4 rounded-full border border-border font-medium text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2"
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-secondary text-secondary' : ''}`} />
                {isInWishlist(product.id) ? 'Wishlisted' : 'Wishlist'}
              </button>
            </div>

            {/* Added to Cart Message */}
            {showAddedMessage && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-3 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-medium">Added to your bag!</span>
              </div>
            )}

            {/* Features */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">Free Shipping</span>
                  <p className="text-sm text-muted-foreground">On orders above ₹5,000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">Easy Returns</span>
                  <p className="text-sm text-muted-foreground">7-day hassle-free returns</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">Authentic Handloom</span>
                  <p className="text-sm text-muted-foreground">GI certified genuine weaves</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-blush">
          <div className="container-luxe">
            <div className="text-center mb-10">
              <p className="eyebrow-label mb-2">You May Also Love</p>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
                Similar Weaves
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
