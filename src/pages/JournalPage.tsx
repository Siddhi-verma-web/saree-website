export default function JournalPage() {
  const articles = [
    { title: 'The Art of Handloom Weaving', excerpt: 'Discover the centuries-old tradition behind every saree we craft.' },
    { title: 'How to Drape a Saree: A Beginner\'s Guide', excerpt: 'Simple steps to master the perfect saree drape for any occasion.' },
    { title: 'Caring for Your Silk Sarees', excerpt: 'Tips to keep your handwoven silk sarees looking new for years.' },
  ];

  return (
    <section className="py-16 md:py-24 pt-32 md:pt-40">
      <div className="container-luxe">
        <div className="mb-12">
          <p className="eyebrow-label mb-2">Stories & Style</p>
          <h1 className="text-4xl md:text-5xl font-medium text-foreground">Journal</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={i} className="p-6 rounded-2xl bg-muted">
              <h2 className="font-serif text-xl font-medium mb-3">{article.title}</h2>
              <p className="text-muted-foreground text-sm">{article.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}