import { Instagram, Facebook, Twitter, Youtube, CreditCard, ChevronDown } from 'lucide-react';

const shopLinks = [
  { name: 'New Arrivals', href: '#' },
  { name: 'Banarasi Sarees', href: '#' },
  { name: 'Kanjivaram', href: '#' },
  { name: 'Bridal Collection', href: '#' },
  { name: 'Cotton & Linen', href: '#' },
  { name: 'Designer Edit', href: '#' },
];

const helpLinks = [
  { name: 'Track Order', href: '#' },
  { name: 'Size Guide', href: '#' },
  { name: 'Shipping Info', href: '#' },
  { name: 'Returns & Exchange', href: '#' },
  { name: 'Care Instructions', href: '#' },
  { name: 'FAQ', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="container-luxe py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="inline-block font-serif text-2xl font-medium mb-4">
              VastraAura
            </a>
            <p className="text-sm text-white/70 mb-6 max-w-xs">
              Curating handwoven luxury from India's finest weaves. Each piece tells a story of heritage, craftsmanship, and timeless elegance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-medium mb-6">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-medium mb-6">Help</h4>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-6">Contact</h4>
            <address className="not-italic text-sm text-white/70 space-y-3">
              <p>
                <strong className="text-white">Studio:</strong><br />
                42 Weaver's Lane,<br />
                Bandra West, Mumbai 400050
              </p>
              <p>
                <strong className="text-white">Email:</strong><br />
                <a href="mailto:hello@vastraaura.com" className="hover:text-white transition-colors">
                  hello@vastraaura.com
                </a>
              </p>
              <p>
                <strong className="text-white">Phone:</strong><br />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-luxe py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/60 text-center md:text-left">
              © 2026 VastraAura. All rights reserved. Handcrafted with love in India.
            </p>

            {/* Payment Icons */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-white/60">
                <CreditCard className="w-8 h-5" />
                <span className="text-xs font-medium">Visa</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <CreditCard className="w-8 h-5" />
                <span className="text-xs font-medium">MC</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <CreditCard className="w-8 h-5" />
                <span className="text-xs font-medium">UPI</span>
              </div>
            </div>

            {/* Language/Currency Selector */}
            <button className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors">
              India (INR ₹)
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
