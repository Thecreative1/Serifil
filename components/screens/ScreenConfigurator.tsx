"use client";

import { AlertCircle, CheckCircle2, LoaderCircle, Mail, MessageCircle, Minus, Plus, RotateCw } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type PointerEvent, type ReactNode } from "react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextArea, TextInput } from "@/components/ui/FormField";
import { brand } from "@/config/brand";
import type { Locale } from "@/data/i18n";
import {
  clampSize,
  commonSizes,
  defaultScreenRequest,
  describeScreenRequest,
  formatSize,
  frameOptions,
  maxColours,
  maxQuantity,
  meshOptions,
  printMargin,
  screenEmailUrl,
  screenWhatsappMessage,
  screensCopy,
  sizeLimits,
  type MeshOption,
  type ScreenRequest,
} from "@/data/screens";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

type Size = { width: number; height: number };
type FormErrors = Partial<Record<"name" | "email" | "phone" | "privacy", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactButtonClass =
  "inline-flex min-h-12 max-w-full items-center gap-3 border border-border px-5 py-3 text-left text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const ink = "#171916";
const paper = "#f7f3ea";
const muted = "#63675f";
const gridLine = "#d6d0c5";
const ghostLine = "#8f8a80";
const accent = "#ff5c00";

/** Espessura visual do perfil do caixilho, em cm. */
const frameProfile = 3;
/** Distância, em cm, a que o desenho encaixa numa medida habitual. */
const snapDistance = 2;
/** Espaçamento da trama no desenho: mais fios por centímetro, trama mais fechada. */
const meshSpacing: Record<MeshOption, number> = {
  "43T": 2.4,
  "55T": 2,
  "77T": 1.6,
  "90T": 1.25,
  "120T": 0.9,
  unsure: 1.8,
};

function orientedSizes(landscape: boolean): Size[] {
  return commonSizes.map((size) => (landscape ? { width: size.height, height: size.width } : { ...size }));
}

function canvasExtent({ width, height }: Size): Size {
  return { width: Math.max(100, width * 1.12 + 4), height: Math.max(100, height * 1.12 + 4) };
}

function snapSize(raw: Size, bounds: Size): Size {
  for (const size of orientedSizes(raw.width > raw.height)) {
    if (Math.abs(size.width - raw.width) <= snapDistance && Math.abs(size.height - raw.height) <= snapDistance) {
      return size;
    }
  }

  return {
    width: Math.min(clampSize(raw.width), Math.floor(bounds.width)),
    height: Math.min(clampSize(raw.height), Math.floor(bounds.height)),
  };
}

export function ScreenConfigurator({ locale }: { locale: Locale }) {
  const copy = screensCopy[locale];
  const [request, setRequest] = useState<ScreenRequest>(defaultScreenRequest);
  const update = (changes: Partial<ScreenRequest>) => setRequest((current) => ({ ...current, ...changes }));
  const landscape = request.width > request.height;

  // Com gravação, cada cor precisa da sua tela: a quantidade nunca fica abaixo do número de cores
  // e acompanha as cores enquanto não tiver sido aumentada à mão.
  const changeColours = (colours: number) =>
    setRequest((current) => ({
      ...current,
      colours,
      quantity: Math.min(
        maxQuantity,
        current.quantity <= current.colours ? colours : Math.max(current.quantity, colours),
      ),
    }));

  const toggleEngraving = () =>
    setRequest((current) => ({
      ...current,
      engraving: !current.engraving,
      quantity: current.engraving ? current.quantity : Math.max(current.quantity, current.colours),
    }));

  return (
    <>
      <section aria-label={copy.toolLabel} className="bg-background py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <div className="lg:sticky lg:top-28">
                <ScreenDrawing locale={locale} request={request} onResize={(size) => update(size)} />
              </div>
            </div>

            <div className="grid min-w-0 content-start gap-10 lg:col-span-5">
              <OptionGroup number="01" title={copy.steps.size}>
                <div>
                  <p className="text-sm font-bold text-text-primary">{copy.commonSizes}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {orientedSizes(landscape).map((size) => {
                      const active = size.width === request.width && size.height === request.height;
                      return (
                        <button
                          key={`${size.width}x${size.height}`}
                          type="button"
                          aria-pressed={active}
                          onClick={() => update(size)}
                          className={`min-h-11 border px-4 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${active ? "border-accent bg-accent text-light-text" : "border-border bg-surface text-text-primary hover:border-text-secondary"}`}
                        >
                          {size.width} × {size.height}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-2 items-end gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                  <DimensionInput id="screen-width" label={copy.width} value={request.width} onChange={(width) => update({ width })} />
                  <DimensionInput id="screen-height" label={copy.height} value={request.height} onChange={(height) => update({ height })} />
                  <button
                    type="button"
                    onClick={() => update({ width: request.height, height: request.width })}
                    className="col-span-2 inline-flex min-h-12 items-center justify-center gap-2 border border-border px-4 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:border-text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:col-span-1"
                  >
                    <RotateCw className="size-4" aria-hidden="true" />
                    {copy.rotate}
                  </button>
                </div>
                <p className="text-sm leading-6 text-text-secondary">
                  {request.frame === "remesh" ? copy.remeshSizeNote : copy.sizeNote}
                </p>
              </OptionGroup>

              <OptionGroup number="02" title={copy.steps.frame}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {frameOptions.map((option) => (
                    <ChoiceCard
                      key={option}
                      type="radio"
                      name="screen-frame"
                      checked={request.frame === option}
                      onChange={() => update({ frame: option })}
                      title={copy.frameOptions[option].title}
                      text={copy.frameOptions[option].text}
                    />
                  ))}
                </div>
              </OptionGroup>

              <OptionGroup number="03" title={copy.steps.mesh} description={copy.meshIntro}>
                {meshOptions.map((option) => (
                  <ChoiceCard
                    key={option}
                    type="radio"
                    name="screen-mesh"
                    checked={request.mesh === option}
                    onChange={() => update({ mesh: option })}
                    badge={option === "unsure" ? undefined : option}
                    title={option === "unsure" ? copy.meshUnsure.title : undefined}
                    text={option === "unsure" ? copy.meshUnsure.text : copy.meshUses[option]}
                  />
                ))}
                <p className="text-sm leading-6 text-text-secondary">{copy.meshNote}</p>
              </OptionGroup>

              <OptionGroup number="04" title={copy.steps.engraving}>
                <ChoiceCard
                  type="checkbox"
                  name="screen-engraving"
                  checked={request.engraving}
                  onChange={toggleEngraving}
                  title={copy.engravingToggle}
                  text={copy.engravingText}
                />
                {request.engraving ? (
                  <Stepper
                    id="screen-colours"
                    label={copy.colours}
                    value={request.colours}
                    min={1}
                    max={maxColours}
                    decreaseLabel={copy.decreaseColours}
                    increaseLabel={copy.increaseColours}
                    onChange={changeColours}
                  />
                ) : null}
              </OptionGroup>

              <OptionGroup number="05" title={copy.steps.quantity}>
                <Stepper
                  id="screen-quantity"
                  label={copy.quantity}
                  value={request.quantity}
                  min={request.engraving ? request.colours : 1}
                  max={maxQuantity}
                  decreaseLabel={copy.decreaseQuantity}
                  increaseLabel={copy.increaseQuantity}
                  onChange={(quantity) => update({ quantity })}
                />
                {request.engraving && request.colours > 1 ? (
                  <p className="text-sm leading-6 text-text-secondary">{copy.quantityPerColour(request.colours)}</p>
                ) : null}
              </OptionGroup>

              <Button href="#pedido" className="w-full sm:w-fit">{copy.continue}</Button>
            </div>
          </div>
        </Container>
      </section>

      <ScreenRequestForm locale={locale} request={request} />
    </>
  );
}

function ScreenDrawing({
  locale,
  request,
  onResize,
}: {
  locale: Locale;
  request: ScreenRequest;
  onResize: (size: Size) => void;
}) {
  const copy = screensCopy[locale];
  const svgRef = useRef<SVGSVGElement>(null);
  const dragBoundsRef = useRef<Size | null>(null);
  const [dragBounds, setDragBounds] = useState<Size | null>(null);
  const { width, height } = request;

  // Durante o arrasto a escala fica fixa, para o canto acompanhar o ponteiro.
  const extent = dragBounds ?? canvasExtent(request);
  const unit = Math.max(extent.width, extent.height) / 100;
  const pad = 11 * unit;
  const gridStep = Math.max(extent.width, extent.height) > 150 ? 20 : 10;
  const columns = Array.from({ length: Math.floor(extent.width / gridStep) + 1 }, (_, index) => index * gridStep);
  const rows = Array.from({ length: Math.floor(extent.height / gridStep) + 1 }, (_, index) => index * gridStep);
  const ghosts = orientedSizes(width > height).filter((size) => size.width !== width || size.height !== height);
  const remesh = request.frame === "remesh";
  const spacing = meshSpacing[request.mesh] * unit;
  const print = { width: width - 2 * printMargin, height: height - 2 * printMargin };
  const showPrint = print.width >= 6 && print.height >= 6;
  const swatchSize = 4 * unit;
  const swatchGap = 1.2 * unit;
  const swatchesWidth = request.colours * swatchSize + (request.colours - 1) * swatchGap;
  const showSwatches = request.engraving && showPrint && swatchesWidth <= print.width - 2 && swatchSize <= print.height - 8 * unit;
  const halo = { paintOrder: "stroke" as const, stroke: paper, strokeWidth: 0.8 * unit, strokeLinejoin: "round" as const };

  function resizeFromPointer(event: PointerEvent<SVGSVGElement>, bounds: Size) {
    const matrix = svgRef.current?.getScreenCTM();
    if (!matrix) return;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    onResize(snapSize({ width: point.x - pad, height: point.y - pad }, { width: bounds.width - 2, height: bounds.height - 2 }));
  }

  function handlePointerDown(event: PointerEvent<SVGSVGElement>) {
    if (event.button !== 0) return;
    const onHandle = event.target instanceof Element && event.target.closest("[data-handle]");
    // Em ecrãs táteis só o canto arrasta, para não bloquear o scroll da página.
    if (event.pointerType !== "mouse" && !onHandle) return;

    event.preventDefault();
    dragBoundsRef.current = extent;
    setDragBounds(extent);
    event.currentTarget.setPointerCapture(event.pointerId);
    resizeFromPointer(event, extent);
  }

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    if (dragBoundsRef.current) resizeFromPointer(event, dragBoundsRef.current);
  }

  function endDrag() {
    dragBoundsRef.current = null;
    setDragBounds(null);
  }

  return (
    <div className="border border-border bg-light-background text-light-text">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[#c9c3b8] px-5 py-4 sm:px-6">
        <h2 className="text-2xl font-bold tracking-[-0.03em]">{copy.drawingTitle}</h2>
        <p className="font-display text-3xl font-black tracking-[-0.05em]">{formatSize(width, height)}</p>
      </div>
      <p id="screen-drawing-hint" className="px-5 pt-4 text-sm leading-6 text-light-muted sm:px-6">
        {copy.canvasHint}
      </p>
      <div className="px-3 pt-2 pb-3 sm:px-5">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${pad + extent.width + 3 * unit} ${pad + extent.height + 2 * unit}`}
          role="img"
          aria-label={copy.canvasLabel(width, height)}
          aria-describedby="screen-drawing-hint"
          className={`block h-auto w-full select-none lg:max-h-[max(30rem,calc(100vh-17rem))] ${dragBounds ? "cursor-grabbing" : "cursor-crosshair"}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <defs>
            <pattern id="screen-mesh" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
              <path d={`M0 0H${spacing}M0 0V${spacing}`} fill="none" stroke={ink} strokeOpacity={0.3} strokeWidth={0.12 * unit} />
            </pattern>
            <pattern id="screen-frame-hatch" width={1.4 * unit} height={1.4 * unit} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d={`M0 0V${1.4 * unit}`} stroke={ink} strokeWidth={0.45 * unit} />
            </pattern>
          </defs>

          {columns.map((x) => (
            <line key={`grid-x-${x}`} x1={pad + x} y1={pad} x2={pad + x} y2={pad + extent.height} stroke={gridLine} strokeWidth={0.15 * unit} />
          ))}
          {rows.map((y) => (
            <line key={`grid-y-${y}`} x1={pad} y1={pad + y} x2={pad + extent.width} y2={pad + y} stroke={gridLine} strokeWidth={0.15 * unit} />
          ))}
          {columns.map((x) => (
            <text key={`ruler-x-${x}`} x={pad + x} y={pad - 3 * unit} textAnchor="middle" fontSize={2.3 * unit} fill={muted}>
              {x}
            </text>
          ))}
          {rows.filter((y) => y > 0).map((y) => (
            <text key={`ruler-y-${y}`} x={pad - 2.5 * unit} y={pad + y + 0.8 * unit} textAnchor="end" fontSize={2.3 * unit} fill={muted}>
              {y}
            </text>
          ))}
          <text x={pad - 2.5 * unit} y={pad - 3 * unit} textAnchor="end" fontSize={2.3 * unit} fontWeight={700} fill={muted}>
            cm
          </text>

          {remesh ? <rect x={pad} y={pad} width={width} height={height} fill={paper} /> : null}
          <rect
            x={pad}
            y={pad}
            width={width}
            height={height}
            fill={remesh ? "url(#screen-frame-hatch)" : ink}
            stroke={ink}
            strokeWidth={0.4 * unit}
          />
          <rect x={pad + frameProfile} y={pad + frameProfile} width={width - 2 * frameProfile} height={height - 2 * frameProfile} fill={paper} />
          <rect x={pad + frameProfile} y={pad + frameProfile} width={width - 2 * frameProfile} height={height - 2 * frameProfile} fill="url(#screen-mesh)" />

          {showPrint ? (
            <rect
              x={pad + printMargin}
              y={pad + printMargin}
              width={print.width}
              height={print.height}
              fill="none"
              stroke={ink}
              strokeWidth={0.3 * unit}
              strokeDasharray={`${1.4 * unit} ${1 * unit}`}
            />
          ) : null}
          {showPrint && print.width >= 31 * unit && print.height >= 12 * unit ? (
            <text x={pad + printMargin + 1.4 * unit} y={pad + printMargin + 3.4 * unit} fontSize={2.2 * unit} fontWeight={700} fill={ink} {...halo}>
              <tspan>{copy.printArea}</tspan>
              <tspan x={pad + printMargin + 1.4 * unit} dy={2.8 * unit}>{formatSize(print.width, print.height)}</tspan>
            </text>
          ) : null}
          {showSwatches
            ? Array.from({ length: request.colours }, (_, index) => (
                <rect
                  key={`colour-${index}`}
                  x={pad + width / 2 - swatchesWidth / 2 + index * (swatchSize + swatchGap)}
                  y={pad + height / 2 - swatchSize / 2}
                  width={swatchSize}
                  height={swatchSize}
                  fill={ink}
                  fillOpacity={1 - index * 0.13}
                />
              ))
            : null}

          {ghosts.map((size) => (
            <g key={`ghost-${size.width}x${size.height}`}>
              <rect
                x={pad}
                y={pad}
                width={size.width}
                height={size.height}
                fill="none"
                stroke={ghostLine}
                strokeWidth={0.3 * unit}
                strokeDasharray={`${1.2 * unit} ${1 * unit}`}
              />
              <text x={pad + size.width - 1 * unit} y={pad + size.height - 1.2 * unit} textAnchor="end" fontSize={2.2 * unit} fontWeight={700} fill={muted} {...halo}>
                {size.width}×{size.height}
              </text>
            </g>
          ))}

          <text x={pad + width / 2} y={pad + height + 5.5 * unit} textAnchor="middle" fontSize={3 * unit} fontWeight={800} fill={ink}>
            {width} cm
          </text>
          <text
            transform={`translate(${pad + width + 5.5 * unit} ${pad + height / 2}) rotate(90)`}
            textAnchor="middle"
            fontSize={3 * unit}
            fontWeight={800}
            fill={ink}
          >
            {height} cm
          </text>

          <g data-handle="resize" className="cursor-nwse-resize" style={{ touchAction: "none" }}>
            <rect x={pad + width - 9 * unit} y={pad + height - 9 * unit} width={18 * unit} height={18 * unit} fill="transparent" />
            <rect
              x={pad + width - 2.4 * unit}
              y={pad + height - 2.4 * unit}
              width={4.8 * unit}
              height={4.8 * unit}
              fill={accent}
              stroke={ink}
              strokeWidth={0.4 * unit}
            />
          </g>
        </svg>
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[#c9c3b8] px-5 py-4 text-xs font-bold text-light-muted sm:px-6">
        <li className="flex items-center gap-2">
          <LegendSwatch kind={remesh ? "hatch" : "solid"} />
          {remesh ? copy.legend.ownFrame : copy.legend.newFrame}
        </li>
        <li className="flex items-center gap-2">
          <LegendSwatch kind="print" />
          {copy.legend.printArea}
        </li>
        <li className="flex items-center gap-2">
          <LegendSwatch kind="ghost" />
          {copy.legend.commonSizes}
        </li>
      </ul>
    </div>
  );
}

function LegendSwatch({ kind }: { kind: "solid" | "hatch" | "print" | "ghost" }) {
  return (
    <svg viewBox="0 0 20 12" className="h-3 w-5 shrink-0" aria-hidden="true">
      {kind === "solid" ? <rect width="20" height="12" fill={ink} /> : null}
      {kind === "hatch" ? (
        <>
          <rect x="0.5" y="0.5" width="19" height="11" fill="none" stroke={ink} />
          <path d="M2 12L10 0M8 12L16 0M14 12L20 3" stroke={ink} strokeWidth="1.5" />
        </>
      ) : null}
      {kind === "print" ? <rect x="1" y="1" width="18" height="10" fill="none" stroke={ink} strokeWidth="1.2" strokeDasharray="3 2" /> : null}
      {kind === "ghost" ? <rect x="1" y="1" width="18" height="10" fill="none" stroke={ghostLine} strokeWidth="1.2" strokeDasharray="2 2" /> : null}
    </svg>
  );
}

function OptionGroup({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-border pt-6">
      <fieldset className="min-w-0">
        <legend className="flex items-baseline gap-3 font-display text-2xl font-bold tracking-[-0.03em] text-text-primary">
          <span className="text-sm font-bold text-accent">{number}</span>
          {title}
        </legend>
        {description ? <p className="mt-2 text-sm leading-6 text-text-secondary">{description}</p> : null}
        <div className="mt-5 grid gap-3">{children}</div>
      </fieldset>
    </div>
  );
}

function ChoiceCard({
  type,
  name,
  checked,
  onChange,
  badge,
  title,
  text,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  badge?: string;
  title?: string;
  text: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-4 border border-border bg-surface p-4 transition-colors hover:border-[#4d514b] has-[:checked]:border-accent has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-accent">
      <input type={type} name={name} checked={checked} onChange={onChange} className="mt-1 size-4 shrink-0 accent-accent" />
      {badge ? (
        <span className="w-14 shrink-0 font-display text-xl leading-6 font-black tracking-[-0.03em] text-text-primary">{badge}</span>
      ) : null}
      <span className="min-w-0">
        {title ? <span className="block font-bold text-text-primary">{title}</span> : null}
        <span className={`block text-sm leading-6 text-text-secondary ${title ? "mt-1" : ""}`}>{text}</span>
      </span>
    </label>
  );
}

function Stepper({
  id,
  label,
  value,
  min,
  max,
  decreaseLabel,
  increaseLabel,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  decreaseLabel: string;
  increaseLabel: string;
  onChange: (value: number) => void;
}) {
  const buttonClass =
    "grid size-12 place-items-center border border-border text-text-primary transition-colors hover:border-text-secondary disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <div className="flex items-center justify-between gap-4 border border-border bg-surface py-2 pr-2 pl-4">
      <span id={`${id}-label`} className="text-sm font-bold text-text-primary">{label}</span>
      <div className="flex items-center" role="group" aria-labelledby={`${id}-label`}>
        <button type="button" aria-label={decreaseLabel} disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))} className={buttonClass}>
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <output id={id} aria-live="polite" className="grid h-12 min-w-14 place-items-center border-y border-border font-display text-xl font-black text-text-primary">
          {value}
        </output>
        <button type="button" aria-label={increaseLabel} disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))} className={buttonClass}>
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function DimensionInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  // Rascunho do que está a ser escrito: só vale como medida quando está dentro dos limites.
  const [draft, setDraft] = useState<string | null>(null);

  function commit(raw: string) {
    const number = Number(raw.replace(",", "."));
    if (raw.trim() && Number.isFinite(number)) onChange(clampSize(number));
    setDraft(null);
  }

  return (
    <TextInput
      id={id}
      label={label}
      type="number"
      inputMode="numeric"
      min={sizeLimits.min}
      max={sizeLimits.max}
      step={1}
      value={draft ?? String(value)}
      onChange={(event) => {
        const raw = event.target.value;
        const number = Number(raw);
        setDraft(raw);
        if (raw && Number.isInteger(number) && number >= sizeLimits.min && number <= sizeLimits.max) onChange(number);
      }}
      onBlur={(event) => commit(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") commit(event.currentTarget.value);
      }}
    />
  );
}

function ScreenRequestForm({ locale, request }: { locale: Locale; request: ScreenRequest }) {
  const copy = screensCopy[locale];
  const rows = describeScreenRequest(locale, request);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function validate(form: HTMLFormElement) {
    const formData = new FormData(form);
    const nextErrors: FormErrors = {};
    const value = (name: string) => String(formData.get(name) ?? "").trim();

    if (!value("name")) nextErrors.name = copy.errors.name;
    if (!emailPattern.test(value("email"))) nextErrors.email = copy.errors.email;
    if (!value("phone")) nextErrors.phone = copy.errors.phone;
    if (formData.get("privacy") !== "on") nextErrors.privacy = copy.errors.privacy;

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setStatus("idle");

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const formData = new FormData(form);
    formData.set("_subject", copy.subject);

    try {
      const response = await fetch(brand.quoteEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error("Form submission failed");

      trackEvent("generate_lead", { form_name: "screen_request" });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="pedido"
      aria-labelledby="screen-summary-title"
      className="scroll-mt-24 border-t border-border bg-surface py-16 sm:py-20 lg:scroll-mt-28 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <h2 id="screen-summary-title" className="text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary">
              {copy.summaryTitle}
            </h2>
            <dl className="mt-8 border-t border-border">
              {rows.map((row) => (
                <div key={row.name} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-b border-border py-4">
                  <dt className="text-xs leading-6 font-black uppercase tracking-[0.12em] text-text-secondary">{row.label}</dt>
                  <dd className="text-base leading-6 font-bold text-text-primary">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm leading-6 text-text-secondary">{copy.noPrice}</p>
            {brand.email || brand.whatsapp ? (
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-sm font-bold text-text-primary">
                  {request.engraving ? copy.artworkTitleEngraving : copy.artworkTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{copy.artworkText}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {brand.email ? (
                    <a href={screenEmailUrl(locale, request, brand.email)} className={contactButtonClass}>
                      <Mail className="size-4 shrink-0" aria-hidden="true" />
                      {copy.emailButton}
                    </a>
                  ) : null}
                  {brand.whatsapp ? (
                    <TrackedLink
                      href={whatsappUrl(screenWhatsappMessage(locale, request))}
                      eventName="whatsapp_click"
                      eventParameters={{ link_location: "screens_tool" }}
                      target="_blank"
                      rel="noreferrer"
                      className={contactButtonClass}
                    >
                      <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
                      {copy.whatsappButton}
                    </TrackedLink>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <div className="min-w-0 lg:col-span-7">
            {status === "success" ? (
              <div ref={successRef} className="flex min-h-[420px] flex-col items-start justify-center border border-border bg-background p-7 sm:p-12" role="status" tabIndex={-1}>
                <CheckCircle2 className="size-12 text-accent" aria-hidden="true" />
                <h3 className="mt-7 max-w-[16ch] text-4xl font-bold tracking-[-0.05em] text-text-primary sm:text-5xl">{copy.successTitle}</h3>
                <p className="mt-5 max-w-[50ch] text-lg leading-8 text-text-secondary">{copy.successDescription}</p>
                {request.engraving && brand.email ? (
                  <div className="mt-8 w-full max-w-[50ch] border-t border-border pt-6">
                    <p className="text-sm leading-6 text-text-secondary">{copy.successArtwork}</p>
                    <a href={screenEmailUrl(locale, request, brand.email)} className={`mt-4 ${contactButtonClass}`}>
                      <Mail className="size-4 shrink-0" aria-hidden="true" />
                      {copy.emailButton}
                    </a>
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    setErrors({});
                    setStatus("idle");
                  }}
                  className="mt-9 min-h-12 border border-border px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {copy.anotherRequest}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-6" aria-label={copy.formLabel} aria-busy={status === "submitting"}>
                <h3 className="text-2xl font-bold tracking-[-0.03em] text-text-primary">{copy.formTitle}</h3>
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                {rows.map((row) => (
                  <input key={row.name} type="hidden" name={row.name} value={row.value} />
                ))}
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextInput id="screen-name" name="name" label={copy.name} autoComplete="name" error={errors.name} required />
                  <TextInput id="screen-company" name="company" label={copy.company} autoComplete="organization" optional optionalLabel={copy.optional} />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextInput id="screen-email" name="email" type="email" label={copy.email} autoComplete="email" error={errors.email} required />
                  <TextInput id="screen-phone" name="phone" type="tel" label={copy.phone} autoComplete="tel" error={errors.phone} required />
                </div>
                <TextArea id="screen-message" name="message" label={copy.message} placeholder={copy.messagePlaceholder} optional optionalLabel={copy.optional} />
                {request.engraving ? (
                  <p className="-mt-3 text-sm leading-6 text-text-secondary">{copy.formArtworkNote}</p>
                ) : null}
                <div>
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-text-secondary">
                    <input
                      name="privacy"
                      type="checkbox"
                      className="mt-1 size-5 shrink-0 accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      aria-invalid={Boolean(errors.privacy)}
                      aria-describedby={errors.privacy ? "screen-privacy-error" : undefined}
                    />
                    <span>{copy.privacy}</span>
                  </label>
                  {errors.privacy ? (
                    <p id="screen-privacy-error" role="alert" className="mt-2 text-sm text-[#ff9c78]">
                      {errors.privacy}
                    </p>
                  ) : null}
                </div>
                {status === "error" ? (
                  <div className="flex items-start gap-3 border border-[#7f3f2b] bg-[#261713] p-4 text-sm leading-6 text-[#ffb49a]" role="alert">
                    <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                    <p>{copy.submissionError}</p>
                  </div>
                ) : null}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex min-h-14 items-center justify-center gap-3 bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-light-text transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {status === "submitting" ? (
                    <>
                      <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> {copy.submitting}
                    </>
                  ) : (
                    copy.submit
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
