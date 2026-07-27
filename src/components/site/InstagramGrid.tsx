import { Instagram } from 'lucide-react';

const instagramPosts = [
  {
    id: 1,
    image: 'src/images/img19.webp',
    alt: 'Customer styling Banarasi silk saree',
  },
  {
    id: 2,
    image: 'src/images/insta1.webp',
    alt: 'Kanjivaram bridal look',
  },
  {
    id: 3,
    image: 'src/images/insta2.webp',
    alt: 'Festive saree styling',
  },
  {
    id: 4,
    image: 'src/images/insta3.webp',
    alt: 'Organza elegance',
  },
  {
    id: 5,
    image: 'src/images/insta4.webp',
    alt: 'Cotton saree daily wear',
  },
  {
    id: 6,
    image: 'src/images/insta5.webp',
    alt: 'Evening chiffon drape',
  },
];

export default function InstagramGrid() {
  return (
    <section className="py-16 md:py-24 bg-blush">
      <div className="container-luxe">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="eyebrow-label mb-3">Styled by You</p>
          <h2 className="text-4xl md:text-5xl font-medium text-foreground">
            @vastraaura on Instagram
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/vastraaura"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-2xl overflow-hidden group"
            >
              <img
                src={post.image}
                alt={post.alt}
                className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-10 h-10 text-white" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
