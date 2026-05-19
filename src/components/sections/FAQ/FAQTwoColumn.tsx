interface FAQTwoColumnProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      question: string;
      answer: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function FAQTwoColumn({ content, eyebrow, subtitle }: FAQTwoColumnProps) {
  return (
    <section id="faq" className="section-y">
      <div className="page-container">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground text-center">
          {content.headline}
        </h2>
        {content.description && (
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            {content.description}
          </p>
        )}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {content.items.map((item, index) => (
            <div key={index}>
              <h3 className="font-medium text-foreground">{item.question}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
