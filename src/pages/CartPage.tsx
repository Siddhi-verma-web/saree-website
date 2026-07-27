import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../lib/CartContext';

export default function CartPage() {
  const { cartItems, updateCartQuantity, removeFromCart, isLoading } = useCart();

  const formatPrice = (pricePaise: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(pricePaise / 100);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0);

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
          Your Bag
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-serif text-2xl mb-2">Your bag is empty</h2>
            <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-muted rounded-2xl">
                  <Link to={`/product/${item.product_id}`} className="flex-shrink-0">
                    <img
                      src={item.products.image_url}
                      alt={item.products.name}
                      className="w-24 h-32 object-cover rounded-lg"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/product/${item.product_id}`} className="block">
                      <span className="eyebrow-label">{item.products.fabric}</span>
                      <h3 className="font-serif text-lg font-medium text-foreground">
                        {item.products.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateCartQuantity(item.product_id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-background transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product_id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-background transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-serif text-xl text-primary mt-2">
                      {formatPrice(item.products.price * item.quantity)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product_id)}
                    className="self-start p-2 hover:bg-background rounded-full transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5 text-muted-foreground hover:text-secondary" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-blush rounded-2xl p-8 h-fit">
              <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Total</span>
                  <span className="font-serif font-medium text-primary">{formatPrice(subtotal)}</span>
                </div>
              </div>
              <button className="btn-primary w-full mt-6 inline-flex items-center justify-center gap-2">
                Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Taxes calculated at checkout
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
