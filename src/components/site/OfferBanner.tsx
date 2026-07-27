export default function OfferBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-luxe">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Image */}
          <img
            src="src/images/offerbanner.webp"
            alt="Festive bridal collection"
            className="w-full h-auto object-none"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}