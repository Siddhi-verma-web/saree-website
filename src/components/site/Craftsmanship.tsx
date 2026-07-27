import { ArrowRight } from 'lucide-react';

export default function Craftsmanship() {
  return (
    <section id="craftsmanship" className="py-16 md:py-24 bg-blush">
      <div className="container-luxe">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden">
            <img
              src="/images/products/img19.webp"
              alt="Artisan weaving on traditional handloom"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/10" />
          </div>

          {/* Content */}
          <div className="order-first md:order-last">
            <p className="eyebrow-label mb-4">The Atelier</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-6">
              Woven by hand, <br />
              worn with pride
            </h2>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                Each VastraAura saree carries within its threads centuries of tradition,
                the legacy of master weavers who have guarded the secrets of their craft
                through generations. In the quiet hum of handlooms across Banaras,
                Kanchipuram, and Dhakai, our artisans breathe life into silk and cotton.
              </p>
              <p>
                We work directly with artisan communities, ensuring fair wages and
                sustainable practices. Every piece you purchase supports the continuation
                of these ancient weaving traditions, keeping the heritage alive for
                generations to come.
              </p>
            </div>
            <button className="btn-primary inline-flex items-center gap-2 group">
              Discover Our Heritage
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}