import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container-luxe">
        <div className="max-w-2xl mx-auto text-center bg-blush rounded-3xl p-10 md:p-16">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
            Join the Atelier
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Be the first to discover new arrivals, exclusive offers, and the stories behind our handwoven treasures.
          </p>

          {isSubmitted ? (
            <div className="text-primary font-medium">
              Thank you for joining the atelier!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-full bg-background border border-border focus:border-primary focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="btn-primary inline-flex items-center gap-2 group whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-6">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our studio.
          </p>
        </div>
      </div>
    </section>
  );
}
