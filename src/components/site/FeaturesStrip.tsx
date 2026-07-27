import { Truck, RotateCcw, ShieldCheck, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders above ₹5,000',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '7-day hassle-free returns',
  },
  {
    icon: ShieldCheck,
    title: 'Authentic Handloom',
    description: 'GI tagged genuine weaves',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: '100% safe checkout',
  },
];

export default function FeaturesStrip() {
  return (
    <section className="py-10 md:py-14 border-y border-border">
      <div className="container-luxe">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm mb-0.5">
                  {feature.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
