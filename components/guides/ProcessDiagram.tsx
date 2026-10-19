import type { GuideProcessVisual } from "@/data/guides";

const ink = "#171916";
const accent = "#ff5c00";
const sheet = "#fbf9f4";
const emulsion = "#e3c83a";

function RegistrationMark({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={ink} strokeWidth="1" fill="none">
      <circle cx={x} cy={y} r="4" />
      <path d={`M${x - 7} ${y}h14M${x} ${y - 7}v14`} />
    </g>
  );
}

function ProcessVisual({ visual }: { visual: GuideProcessVisual }) {
  const svgProps = {
    viewBox: "0 0 240 180",
    className: "block size-full",
    "aria-hidden": true,
    focusable: false,
  } as const;

  switch (visual) {
    case "artwork":
      return (
        <svg {...svgProps}>
          <rect x="62" y="18" width="116" height="144" fill={sheet} stroke={ink} strokeWidth="2" />
          <circle cx="120" cy="74" r="28" fill={accent} />
          <rect x="80" y="116" width="80" height="16" fill={ink} />
          <path d="M80 146h44" stroke={ink} strokeOpacity=".35" strokeWidth="2" />
        </svg>
      );
    case "film":
      return (
        <svg {...svgProps}>
          <rect x="34" y="30" width="116" height="136" fill="#ffffff" fillOpacity=".5" stroke={ink} strokeWidth="1.5" />
          <circle cx="92" cy="86" r="28" fill={ink} />
          <RegistrationMark x={92} y={44} />
          <rect x="90" y="14" width="116" height="136" fill="#ffffff" fillOpacity=".6" stroke={ink} strokeWidth="1.5" />
          <rect x="108" y="112" width="80" height="16" fill={ink} />
          <RegistrationMark x={148} y={28} />
        </svg>
      );
    case "screen":
      return (
        <svg {...svgProps}>
          <defs>
            <pattern id="guia-malha" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M0 .5H5M.5 0V5" stroke={ink} strokeOpacity=".45" strokeWidth="1" />
            </pattern>
          </defs>
          {[70, 120, 170].map((x) => (
            <path key={x} d={`M${x} 6v20m-6-7 6 7 6-7`} stroke={accent} strokeWidth="2.5" fill="none" />
          ))}
          <rect x="30" y="40" width="180" height="128" fill={emulsion} stroke={ink} strokeWidth="10" />
          <circle cx="120" cy="94" r="28" fill={sheet} />
          <circle cx="120" cy="94" r="28" fill="url(#guia-malha)" />
        </svg>
      );
    case "print":
      return (
        <svg {...svgProps}>
          <rect x="36" y="80" width="168" height="88" fill={sheet} stroke={ink} strokeWidth="2" />
          <circle cx="120" cy="112" r="20" fill={accent} />
          <rect x="92" y="142" width="56" height="11" fill={ink} />
          <path d="M20 68H220" stroke={ink} strokeWidth="3" />
          <rect x="66" y="20" width="92" height="18" fill={ink} />
          <path d="M72 38h80l-6 26H78z" fill={accent} />
          <path d="M172 30h36m-8-7 8 7-8 7" stroke={ink} strokeWidth="2.5" fill="none" />
        </svg>
      );
    case "dtf-film":
      // Filme transparente com o desenho a cores e, por trás, a camada de branco.
      return (
        <svg {...svgProps}>
          <rect x="40" y="22" width="160" height="136" fill="#ffffff" fillOpacity=".55" stroke={ink} strokeWidth="1.5" />
          <circle cx="126" cy="78" r="30" fill="#ffffff" stroke={ink} strokeOpacity=".3" strokeWidth="1" />
          <circle cx="120" cy="74" r="28" fill={accent} />
          <rect x="84" y="118" width="72" height="14" fill="#ffffff" stroke={ink} strokeOpacity=".3" strokeWidth="1" />
          <rect x="80" y="114" width="72" height="14" fill="#2f6fb3" />
          <path d="M28 40v100M212 40v100" stroke={ink} strokeOpacity=".35" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      );
    case "powder":
      // O pó cai sobre o filme e só fica agarrado à impressão.
      return (
        <svg {...svgProps}>
          <rect x="40" y="60" width="160" height="100" fill="#ffffff" fillOpacity=".55" stroke={ink} strokeWidth="1.5" />
          <circle cx="120" cy="104" r="26" fill={accent} />
          {[
            [100, 20], [118, 30], [136, 18], [92, 40], [128, 44], [146, 36], [110, 52], [140, 56],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill={ink} fillOpacity=".55" />
          ))}
          {[
            [104, 92], [118, 86], [134, 94], [110, 110], [126, 106], [140, 112], [116, 122], [130, 124], [100, 104],
          ].map(([x, y]) => (
            <circle key={`p-${x}-${y}`} cx={x} cy={y} r="2.2" fill="#ffffff" />
          ))}
        </svg>
      );
    case "press":
      // Prensa de calor fechada sobre a peça.
      return (
        <svg {...svgProps}>
          <path d="M70 96l26-14h48l26 14-12 22-14-6v52H96v-52l-14 6z" fill={sheet} stroke={ink} strokeWidth="2" />
          <circle cx="120" cy="128" r="16" fill={accent} />
          <rect x="50" y="52" width="140" height="22" fill={ink} />
          <rect x="112" y="20" width="16" height="32" fill={ink} />
          {[76, 104, 136, 164].map((x) => (
            <path key={x} d={`M${x} 80c-4 4 4 8 0 12`} stroke={accent} strokeWidth="2.5" fill="none" />
          ))}
        </svg>
      );
  }
}

type ProcessDiagramProps = {
  caption: string;
  steps: Array<{ visual: GuideProcessVisual; title: string; text: string }>;
};

export function ProcessDiagram({ caption, steps }: ProcessDiagramProps) {
  return (
    <figure className="border border-light-text">
      <ol className="grid gap-px bg-light-border sm:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step.title} className="bg-light-background p-5 sm:p-6">
            <div className="aspect-[4/3] border border-light-border bg-[#e6e1d6]">
              <ProcessVisual visual={step.visual} />
            </div>
            <p className="mt-5 text-xs font-bold text-light-muted">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-2xl leading-tight font-bold tracking-[-0.035em] text-light-text">{step.title}</h3>
            <p className="mt-3 text-base leading-7 text-light-muted">{step.text}</p>
          </li>
        ))}
      </ol>
      <figcaption className="bg-light-text px-5 py-4 text-sm leading-6 text-text-secondary">{caption}</figcaption>
    </figure>
  );
}
