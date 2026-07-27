import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '../../lib/CartContext';

const announcements = [
  'Complimentary shipping on orders above ₹5,000',
  'Handloom · Handpicked · Handcrafted',
  'New Bridal Collection Now Available',
];

const weaveCategories = [
  { name: 'Banarasi', image: 'https://i.pinimg.com/736x/5c/1d/e3/5c1de393fb9a61f5601ba72d469f0069.jpg' },
  { name: 'Kanjivaram', image: 'https://i.pinimg.com/736x/8d/5d/df/8d5ddf904be40cb0b704b2c8747311a6.jpg' },
  { name: 'Chiffon', image: 'https://i.pinimg.com/736x/9c/77/54/9c77541d70ddc5517d649cf09c4f6674.jpg' },
  { name: 'Organza', image: 'https://i.pinimg.com/736x/1f/06/39/1f0639e0cce4448ebefca62c4ecd2d6a.jpg' },
  { name: 'Cotton', image: 'https://i.pinimg.com/736x/bd/b0/95/bdb0959555f5226ba0d78315878e2f77.jpg' },
  { name: 'Bridal', image: 'https://i.pinimg.com/736x/9e/1d/59/9e1d59eddf8e8b3c11ecdcb5536c8213.jpg' },
  { name: 'Linen', image: 'https://i.pinimg.com/736x/fc/f3/ce/fcf3ce641c952531fa9221436b78c928.jpg' },
  { name: 'Designer', image: 'https://i.pinimg.com/736x/da/b6/df/dab6df6fc463daca9bf2d8d55a93ab35.jpg' },
];

const navLinks = [
  { name: 'New Arrivals', href: '/' },
  {
    name: 'Sarees',
    href: '#sarees',
    hasMegaMenu: true,
  },
  { name: 'Bridal', href: '/bridal' },
  { name: 'Craftsmanship', href: '/craftsmanship' },
  { name: 'Journal', href: '/journal' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const { cartCount, wishlistCount } = useCart();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-primary text-white">
        <div className="container-luxe py-2 text-center">
          <p className="text-xs tracking-wide font-light transition-opacity duration-500">
            {announcements[announcementIndex]}
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`transition-all duration-400 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-soft'
            : 'bg-background'
        }`}
      >
        <div className="container-luxe">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-primary">
              VastraAura
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.hasMegaMenu && setIsMegaMenuOpen(true)}
                  onMouseLeave={() => link.hasMegaMenu && setIsMegaMenuOpen(false)}
                >
                  <Link
                    to={link.href}
                    className="nav-link inline-flex items-center gap-1"
                  >
                    {link.name}
                    {link.hasMegaMenu && (
                      <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                    )}
                  </Link>

                  {/* Mega Menu */}
                  {link.hasMegaMenu && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                        isMegaMenuOpen
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      <div className="bg-background rounded-2xl shadow-luxe p-8 w-[600px] grid grid-cols-4 gap-6">
                        {weaveCategories.map((category) => (
                          <Link
                            key={category.name}
                            to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="group text-center"
                          >
                            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-3 ring-2 ring-border group-hover:ring-primary transition-all duration-300">
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                              />
                            </div>
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                              {category.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              <Link to="/search" className="p-2 hover:bg-muted rounded-full transition-colors" aria-label="Search">
                <Search className="w-5 h-5" />
              </Link>
              <Link to="/wishlist" className="p-2 hover:bg-muted rounded-full transition-colors relative" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="p-2 hover:bg-muted rounded-full transition-colors relative" aria-label="Cart">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button className="p-2 hover:bg-muted rounded-full transition-colors hidden md:block" aria-label="Account">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background transition-transform duration-400 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-border">
            <Link to="/" className="font-serif text-xl font-medium text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              VastraAura
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-5">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-border">
                {link.hasMegaMenu ? (
                  <button
                    className="w-full py-4 flex items-center justify-between text-left"
                    onClick={() =>
                      setMobileAccordion(mobileAccordion === link.name ? null : link.name)
                    }
                  >
                    <span className="font-medium">{link.name}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        mobileAccordion === link.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <Link to={link.href} className="block py-4 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    {link.name}
                  </Link>
                )}
                {link.hasMegaMenu && mobileAccordion === link.name && (
                  <div className="pb-4 grid grid-cols-2 gap-3">
                    {weaveCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-10 h-10 rounded-full object-cover"
                          loading="lazy"
                        />
                        <span className="text-sm">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}