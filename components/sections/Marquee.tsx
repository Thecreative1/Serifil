const line = "SERIGRAFIA · PLÁSTICO · SACOS · TÊXTIL · ROUPA PROFISSIONAL · MERCHANDISING · LASER · PRODUÇÃO · GUIMARÃES ·";

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-4" aria-label="Especialidades: serigrafia, plástico, sacos, têxtil, roupa profissional, merchandising, laser e produção em Guimarães">
      <div className="marquee-track flex w-max text-sm font-bold uppercase tracking-[0.16em] text-text-primary" aria-hidden="true">
        <span className="pr-8">{line}</span>
        <span className="pr-8">{line}</span>
      </div>
    </div>
  );
}
