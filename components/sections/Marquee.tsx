const line = "SACOS EM TECIDO PARA CALÇADO · SACOS PLÁSTICOS · CAPAS GUARDA-FATOS · SERIGRAFIA · PRODUÇÃO EM GUIMARÃES ·";

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-4" aria-label="Especialidades: sacos em tecido para calçado, sacos plásticos, capas guarda-fatos e serigrafia em Guimarães">
      <div className="marquee-track flex w-max text-sm font-bold uppercase tracking-[0.16em] text-text-primary" aria-hidden="true">
        <span className="pr-8">{line}</span>
        <span className="pr-8">{line}</span>
      </div>
    </div>
  );
}
