type Crumb = { label: string; href?: string };

export function GuideBreadcrumbs({ label, items }: { label: string; items: Crumb[] }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <a
                href={item.href}
                className="transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-text-primary" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
