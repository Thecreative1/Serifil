type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, light = false, className = "" }: SectionHeadingProps) {
  return (
    <div className={`grid gap-7 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:gap-16 ${className}`}>
      <p className={`section-kicker ${light ? "text-light-muted" : "text-accent"}`}>{eyebrow}</p>
      <div>
        <h2 className={`text-balance text-[clamp(2.4rem,6vw,5.8rem)] leading-[0.94] font-bold tracking-[-0.055em] ${light ? "text-light-text" : "text-text-primary"}`}>
          {title}
        </h2>
        {description ? (
          <p className={`mt-6 max-w-[62ch] text-base leading-7 sm:text-lg ${light ? "text-light-body" : "text-text-secondary"}`}>
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
