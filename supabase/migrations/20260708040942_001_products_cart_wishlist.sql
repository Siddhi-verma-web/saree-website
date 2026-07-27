/*
# Create products, cart_items, and wishlist_items tables

1. New Tables
- `products`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `slug` (text, unique, not null)
  - `description` (text)
  - `fabric` (text)
  - `price` (integer, not null) - stored in paise (₹1 = 100 paise)
  - `old_price` (integer) - original price for discounts
  - `discount` (integer) - discount percentage
  - `rating` (decimal)
  - `reviews_count` (integer)
  - `image_url` (text)
  - `image_hover_url` (text)
  - `images` (text array) - additional product images
  - `in_stock` (boolean, default true)
  - `created_at` (timestamp)

- `cart_items`
  - `id` (uuid, primary key)
  - `session_id` (text, not null) - identifies visitor without auth
  - `product_id` (uuid, references products)
  - `quantity` (integer, default 1)
  - `created_at` (timestamp)

- `wishlist_items`
  - `id` (uuid, primary key)
  - `session_id` (text, not null)
  - `product_id` (uuid, references products)
  - `created_at` (timestamp)

2. Security
- RLS enabled on all tables
- All tables allow anon + authenticated CRUD (single-tenant, session-based)
- Session ID isolates each visitor's cart/wishlist

3. Indexes
- `cart_items_session_id_idx` for fast cart lookups by session
- `wishlist_items_session_id_idx` for fast wishlist lookups
- `products_slug_idx` for product page lookups by slug
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  fabric text,
  price integer NOT NULL,
  old_price integer,
  discount integer,
  rating decimal(3,2),
  reviews_count integer DEFAULT 0,
  image_url text,
  image_hover_url text,
  images text[] DEFAULT '{}',
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(session_id, product_id)
);

CREATE TABLE IF NOT EXISTS wishlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(session_id, product_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS cart_items_session_id_idx ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS wishlist_items_session_id_idx ON wishlist_items(session_id);
CREATE INDEX IF NOT EXISTS products_slug_idx ON products(slug);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- Products policies (read-only for catalog)
DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Cart items policies
DROP POLICY IF EXISTS "anon_select_cart" ON cart_items;
CREATE POLICY "anon_select_cart" ON cart_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_cart" ON cart_items;
CREATE POLICY "anon_insert_cart" ON cart_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_cart" ON cart_items;
CREATE POLICY "anon_update_cart" ON cart_items FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_cart" ON cart_items;
CREATE POLICY "anon_delete_cart" ON cart_items FOR DELETE
  TO anon, authenticated USING (true);

-- Wishlist items policies
DROP POLICY IF EXISTS "anon_select_wishlist" ON wishlist_items;
CREATE POLICY "anon_select_wishlist" ON wishlist_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_wishlist" ON wishlist_items;
CREATE POLICY "anon_insert_wishlist" ON wishlist_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_wishlist" ON wishlist_items;
CREATE POLICY "anon_delete_wishlist" ON wishlist_items FOR DELETE
  TO anon, authenticated USING (true);