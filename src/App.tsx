import JournalPage from './pages/JournalPage';
import ContactPage from './pages/ContactPage';
import SearchPage from './pages/SearchPage';
import BridalPage from './pages/BridalPage';
import ScrollToTop from './ScrollToTop';
import CategoryPage from './pages/CategoryPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './lib/CartContext';
import Header from './components/site/Header';
import Hero from './components/site/Hero';
import ShopByWeave from './components/site/ShopByWeave';
import FeaturedProducts from './components/site/FeaturedProducts';
import OfferBanner from './components/site/OfferBanner';
import NewArrivals from './components/site/NewArrivals';
import FeaturesStrip from './components/site/FeaturesStrip';
import Craftsmanship from './components/site/Craftsmanship';
import Reviews from './components/site/Reviews';
import InstagramGrid from './components/site/InstagramGrid';
import Newsletter from './components/site/Newsletter';
import Footer from './components/site/Footer';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import WhatsAppButton from './components/site/WhatsAppButton';

function HomePage() {
  return (
    <>
      <Hero />
      <ShopByWeave />
      <FeaturedProducts />
      <OfferBanner />
      <NewArrivals />
      <FeaturesStrip />
      <Craftsmanship />
      <Reviews />
      <InstagramGrid />
      <Newsletter />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-background font-sans antialiased">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
               <Route path="/search" element={<SearchPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/category/:fabricSlug" element={<CategoryPage />} />
                <Route path="/bridal" element={<BridalPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/journal" element={<JournalPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>

      </BrowserRouter>
      
    </CartProvider>
  );
}

export default App;