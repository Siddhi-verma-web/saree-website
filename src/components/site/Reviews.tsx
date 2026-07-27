import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    quote: "The Kanjivaram I received was absolutely stunning. The quality exceeded my expectations, and the packaging made it feel like receiving a precious gift. VastraAura has become my trusted destination for authentic handloom sarees.",
    name: 'Priya Sharma',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 2,
    quote: "I ordered a bridal Banarasi for my wedding and it was perfect. The zari work is exquisite and the fabric quality is exceptional. The team was incredibly helpful with sizing and delivery timing. Highly recommended!",
    name: 'Ananya Iyer',
    city: 'Chennai',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 3,
    quote: "Finally found a brand that cares about authentic craftsmanship. The organza saree I bought is lightweight yet luxurious. I appreciate their commitment to supporting traditional weavers. Will definitely shop again.",
    name: 'Megha Kapoor',
    city: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-luxe">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="eyebrow-label mb-3">Kind Words</p>
          <h2 className="text-4xl md:text-5xl font-medium text-foreground">
            Loved by Our Muse
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-muted rounded-2xl p-8 md:p-10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? 'fill-accent text-accent'
                        : 'text-border fill-border'
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-lg italic text-foreground leading-relaxed mb-8">
                "{review.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-medium text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.city}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
