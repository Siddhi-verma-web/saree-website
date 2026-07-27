import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase, getSessionId } from './supabase';

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    fabric: string;
  };
}

export interface WishlistItem {
  id: string;
  product_id: string;
  products: {
    id: string;
    name: string;
    price: number;
    old_price: number | null;
    discount: number | null;
    image_url: string;
    fabric: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  cartCount: number;
  wishlistCount: number;
  isLoading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  isInCart: (productId: string) => boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  refreshCart: () => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sessionId = getSessionId();

  const refreshCart = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('id, product_id, quantity, products(id, name, price, image_url, fabric)')
        .eq('session_id', sessionId);

      if (error) throw error;
      setCartItems((data as unknown as CartItem[]) || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, [sessionId]);

  const refreshWishlist = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('id, product_id, products(id, name, price, old_price, discount, image_url, fabric)')
        .eq('session_id', sessionId);

      if (error) throw error;
      setWishlistItems((data as unknown as WishlistItem[]) || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }, [sessionId]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([refreshCart(), refreshWishlist()]);
      setIsLoading(false);
    };
    fetchData();
  }, [refreshCart, refreshWishlist]);

  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    try {
      // Check if already in cart
      const existing = cartItems.find(item => item.product_id === productId);

      if (existing) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + quantity })
          .eq('id', existing.id);
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('cart_items')
          .insert({ session_id: sessionId, product_id: productId, quantity });
        if (error) throw error;
      }

      await refreshCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }, [cartItems, sessionId, refreshCart]);

  const removeFromCart = useCallback(async (productId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('session_id', sessionId)
        .eq('product_id', productId);

      if (error) throw error;
      await refreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }, [sessionId, refreshCart]);

  const updateCartQuantity = useCallback(async (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('session_id', sessionId)
        .eq('product_id', productId);

      if (error) throw error;
      await refreshCart();
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      throw error;
    }
  }, [sessionId, refreshCart, removeFromCart]);

  const isInCart = useCallback((productId: string) => {
    return cartItems.some(item => item.product_id === productId);
  }, [cartItems]);

  const addToWishlist = useCallback(async (productId: string) => {
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .insert({ session_id: sessionId, product_id: productId });

      if (error) throw error;
      await refreshWishlist();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  }, [sessionId, refreshWishlist]);

  const removeFromWishlist = useCallback(async (productId: string) => {
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('session_id', sessionId)
        .eq('product_id', productId);

      if (error) throw error;
      await refreshWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  }, [sessionId, refreshWishlist]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistItems.some(item => item.product_id === productId);
  }, [wishlistItems]);

  const value: CartContextType = {
    cartItems,
    wishlistItems,
    cartCount: cartItems.length,
    wishlistCount: wishlistItems.length,
    isLoading,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    isInCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refreshCart,
    refreshWishlist,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
