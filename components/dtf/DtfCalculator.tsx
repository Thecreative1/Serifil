"use client";

import { AlertCircle, CheckCircle2, LoaderCircle, Mail, MessageCircle, Plus, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { OptionCard, OptionGroup } from "@/components/screens/ScreenConfigurator";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextArea, TextInput } from "@/components/ui/FormField";
import { brand } from "@/config/brand";
import {
  clampCopies,
  clampDesignSize,
  defaultDtfRequest,
  describeDtfRequest,
  designLimits,
  dtfCopy,
  dtfEmailUrl,
  dtfPresets,
  dtfServiceOptions,
  dtfWhatsappMessage,
  formatEuros,
  formatMetres,
  layoutDtf,
  maxCopies,
  maxDesigns,
  rollWidth,
  type DtfDesign,
  type DtfLayout,
  type DtfRequest,
} from "@/data/dtf";
import type { Locale } from "@/data/i18n";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

type FormErrors = Partial<Record<"name" | "email" | "phone" | "privacy", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const contactButtonClass = `inline-flex min-h-12 max-w-full items-center gap-3 border border-border px-5 py-3 text-left text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors duration-300 hover:border-accent hover:text-accent ${focusRing}`;
const smallButtonClass = `inline-flex min-h-11 items-center justify-center gap-2 border border-border px-3 text-sm font-bold tabular-nums text-text-primary transition-colors duration-300 hover:border-text-secondary active:bg-surface-light ${focusRing}`;

/** Cor de cada desenho no filme e na lista, pela ordem em que são adicionados. */
const designColours = ["#ff5c00", "#171916", "#7a7e76", "#ff9c66", "#3d403b", "#b9b4a8"] as const;

function designColour(index: number) {
  return designColours[index % designColours.length];
}

export function DtfCalculator({ locale }: { locale: Locale }) {
  const copy = dtfCopy[locale];
  const [request, setRequest] = useState<DtfRequest>(defaultDtfRequest);
  const layout = layoutDtf(request.designs);
  const nextId = useRef(defaultDtfRequest.designs.length + 1);

  const updateDesign = (id: number, changes: Partial<DtfDesign>) =>
    setRequest((current) => ({
      ...current,
      designs: current.designs.map((design) => (design.id === id ? { ...design, ...changes } : design)),
    }));

  const addDesign = (size: { width: number; height: number }) =>
    setRequest((current) =>
      current.designs.length >= maxDesigns
        ? current
        : { ...current, designs: [...current.designs, { id: nextId.current++, ...size, copies: 10 }] },
    );

  const removeDesign = (id: number) =>
    setRequest((current) => ({ ...current, designs: current.designs.filter((design) => design.id !== id) }));

  const full = request.designs.length >= maxDesigns;

  return (
    <>
      <section aria-label={copy.toolLabel} className="bg-background py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <div className="lg:sticky lg:top-28">
                <RollDrawing locale={locale} request={request} layout={layout} />
              </div>
            </div>

            <div className="grid min-w-0 content-start gap-8 lg:col-span-5">
              <OptionGroup number="01" title={copy.steps.designs} description={copy.designsIntro}>
                <ol className="grid gap-3">
                  {request.designs.map((design, index) => {
                    const fit = layout.perDesign.find((item) => item.id === design.id);
                    return (
                      <li key={design.id} className="border border-border bg-surface p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="flex items-center gap-3 font-bold text-text-primary">
                            <span className="size-3.5 shrink-0 border border-[#4d514b]" style={{ backgroundColor: designColour(index) }} aria-hidden="true" />
                            {copy.design(index + 1)}
                          </p>
                          {request.designs.length > 1 ? (
                            <button
                              type="button"
                              aria-label={copy.removeDesign(index + 1)}
                              onClick={() => removeDesign(design.id)}
                              className={`grid size-9 place-items-center text-text-secondary transition-colors hover:text-accent ${focusRing}`}
                            >
                              <X className="size-4" aria-hidden="true" />
                            </button>
                          ) : null}
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-3">
                          <NumberField
                            id={`dtf-width-${design.id}`}
                            label={copy.width}
                            value={design.width}
                            min={designLimits.min}
                            max={designLimits.maxWidth}
                            step={0.1}
                            normalise={(value) => clampDesignSize(value, designLimits.maxWidth)}
                            onChange={(width) => updateDesign(design.id, { width })}
                          />
                          <NumberField
                            id={`dtf-height-${design.id}`}
                            label={copy.height}
                            value={design.height}
                            min={designLimits.min}
                            max={designLimits.maxHeight}
                            step={0.1}
                            normalise={(value) => clampDesignSize(value, designLimits.maxHeight)}
                            onChange={(height) => updateDesign(design.id, { height })}
                          />
                          <NumberField
                            id={`dtf-copies-${design.id}`}
                            label={copy.copies}
                            value={design.copies}
                            min={1}
                            max={maxCopies}
                            step={1}
                            normalise={clampCopies}
                            onChange={(copies) => updateDesign(design.id, { copies })}
                          />
                        </div>
                        {fit ? (
                          <p className="mt-3 text-sm leading-6 text-text-secondary">{copy.fitsPerMetre(fit.perMetre, fit.rotated)}</p>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">{copy.presetsLabel}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {dtfPresets.map((preset) => (
                      <button
                        key={preset.key}
                        type="button"
                        disabled={full}
                        onClick={() => addDesign(preset)}
                        className={`${smallButtonClass} disabled:cursor-not-allowed disabled:opacity-40`}
                      >
                        <Plus className="size-3.5" aria-hidden="true" />
                        {copy.presets[preset.key]}
                      </button>
                    ))}
                    <button
                      type="button"
                      disabled={full}
                      onClick={() => addDesign({ width: 15, height: 15 })}
                      className={`${smallButtonClass} col-span-2 uppercase tracking-[0.08em] disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      <Plus className="size-4" aria-hidden="true" />
                      {copy.addDesign}
                    </button>
                  </div>
                  {full ? <p className="mt-3 text-sm leading-6 text-text-secondary">{copy.maxDesigns}</p> : null}
                </div>
              </OptionGroup>

              <OptionGroup number="02" title={copy.steps.service}>
                <div className="grid gap-2 sm:grid-cols-2">
                  {dtfServiceOptions.map((option) => (
                    <OptionCard
                      key={option}
                      type="radio"
                      name="dtf-service"
                      checked={request.service === option}
                      onChange={() => setRequest((current) => ({ ...current, service: option }))}
                      title={copy.serviceOptions[option].title}
                      text={copy.serviceOptions[option].text}
                    />
                  ))}
                </div>
                {request.service === "pressed" ? <p className="text-sm leading-6 text-text-secondary">{copy.pressedNote}</p> : null}
              </OptionGroup>

              <div className="grid grid-cols-2 border border-border" aria-live="polite">
                <div className="border-r border-border p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">{copy.resultLength}</p>
                  <p className="mt-1 font-display text-3xl font-black tabular-nums tracking-[-0.04em] text-text-primary">
                    {formatMetres(locale, layout.billedLength)}
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">{copy.resultPrice}</p>
                  <p className="mt-1 font-display text-3xl font-black tabular-nums tracking-[-0.04em] text-accent">
                    {formatEuros(locale, layout.price)}
                    <span className="ml-1.5 font-sans text-sm font-bold tracking-normal text-text-secondary">{copy.priceNote}</span>
                  </p>
                </div>
                <p className="col-span-2 border-t border-border px-4 py-3 text-sm leading-6 text-text-secondary">
                  {copy.perMetre}. {copy.estimateNote}
                </p>
              </div>

              <Button href="#pedido" className="w-full sm:w-fit">{copy.continue}</Button>
            </div>
          </div>
        </Container>
      </section>

      <DtfRequestForm locale={locale} request={request} layout={layout} />
    </>
  );
}

function RollDrawing({ locale, request, layout }: { locale: Locale; request: DtfRequest; layout: DtfLayout }) {
  const copy = dtfCopy[locale];
  // Mostra-se sempre pelo menos um metro, para se ver quanto do metro fica livre.
  const shown = Math.max(100, layout.billedLength);
  const pad = 6;
  const labelSpace = 9;
  const metres = Array.from({ length: Math.floor(shown / 100) }, (_, index) => (index + 1) * 100);
  const designIndex = new Map(request.designs.map((design, index) => [design.id, index]));
  const pieceCount = layout.pieces.length;
  const specLine = [
    copy.pieces(pieceCount),
    `${formatEuros(locale, layout.price)} ${copy.priceNote}`,
    copy.serviceOptions[request.service].title,
  ].join(" · ");

  return (
    <div className="border border-border bg-light-background text-light-text">
      <div className="border-b border-light-border px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 className="text-2xl font-bold tracking-[-0.03em]">{copy.rollTitle}</h2>
          <p className="font-display text-3xl font-black tabular-nums tracking-[-0.05em]">{formatMetres(locale, layout.billedLength)}</p>
        </div>
        <p className="mt-1 text-sm leading-6 font-semibold text-light-muted">{specLine}</p>
      </div>

      <div className="max-h-[50vh] overflow-y-auto px-3 pt-4 pb-2 sm:px-5 lg:max-h-[calc(100vh-20rem)]">
        <svg
          viewBox={`0 0 ${pad + rollWidth + labelSpace} ${shown + 2 * pad}`}
          role="img"
          aria-label={copy.rollLabel(formatMetres(locale, layout.billedLength), pieceCount)}
          className="mx-auto block h-auto w-full max-w-[22rem]"
        >
          <rect x={pad} y={pad} width={rollWidth} height={shown} className="fill-white stroke-light-border" strokeWidth={0.3} />
          {layout.billedLength > 0 ? (
            <rect x={pad} y={pad} width={rollWidth} height={layout.billedLength} className="fill-[#f7f4ee] stroke-light-text" strokeWidth={0.35} />
          ) : null}

          {layout.pieces.map((piece, index) => {
            const colourIndex = designIndex.get(piece.design) ?? 0;
            const labelSize = Math.min(piece.width, piece.height) * 0.45;
            return (
              <g key={index}>
                <rect
                  x={pad + piece.x}
                  y={pad + piece.y}
                  width={piece.width}
                  height={piece.height}
                  fill={designColour(colourIndex)}
                  className="stroke-light-background"
                  strokeWidth={0.2}
                />
                {labelSize >= 2.4 ? (
                  <text
                    x={pad + piece.x + piece.width / 2}
                    y={pad + piece.y + piece.height / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={Math.min(labelSize, 6)}
                    fontWeight={800}
                    className={colourIndex === 1 || colourIndex === 4 ? "fill-text-primary" : "fill-light-text"}
                  >
                    {colourIndex + 1}
                  </text>
                ) : null}
              </g>
            );
          })}

          {metres.map((y) => (
            <g key={y}>
              <line
                x1={pad - 2}
                x2={pad + rollWidth + 2}
                y1={pad + y}
                y2={pad + y}
                className="stroke-accent"
                strokeWidth={0.4}
                strokeDasharray="1.6 1"
              />
              <text x={pad + rollWidth + 2.5} y={pad + y} dominantBaseline="central" fontSize={2.8} fontWeight={800} className="fill-light-text">
                {copy.metre(y / 100)}
              </text>
            </g>
          ))}
          <text x={pad + rollWidth / 2} y={pad - 1.8} textAnchor="middle" fontSize={2.6} fontWeight={700} className="fill-light-muted">
            {rollWidth} cm
          </text>
        </svg>
      </div>

      <div className="border-t border-light-border px-5 py-4 sm:px-6">
        <p className="text-xs leading-5 font-semibold text-light-muted">{copy.rollHint}</p>
      </div>
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  min,
  max,
  step,
  normalise,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  normalise: (value: number) => number;
  onChange: (value: number) => void;
}) {
  // Rascunho do que está a ser escrito: só vale quando está dentro dos limites.
  const [draft, setDraft] = useState<string | null>(null);

  function commit(raw: string) {
    const number = Number(raw.replace(",", "."));
    if (raw.trim() && Number.isFinite(number)) onChange(normalise(number));
    setDraft(null);
  }

  return (
    <TextInput
      id={id}
      label={label}
      type="number"
      inputMode="decimal"
      min={min}
      max={max}
      step={step}
      value={draft ?? String(value)}
      onChange={(event) => {
        const raw = event.target.value;
        const number = Number(raw.replace(",", "."));
        setDraft(raw);
        if (raw && Number.isFinite(number) && number >= min && number <= max) onChange(normalise(number));
      }}
      onBlur={(event) => commit(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") commit(event.currentTarget.value);
      }}
    />
  );
}

function DtfRequestForm({ locale, request, layout }: { locale: Locale; request: DtfRequest; layout: DtfLayout }) {
  const copy = dtfCopy[locale];
  const rows = describeDtfRequest(locale, request);
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

      trackEvent("generate_lead", { form_name: "dtf_request" });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="pedido"
      aria-labelledby="dtf-summary-title"
      className="scroll-mt-24 border-t border-border bg-surface py-16 sm:py-20 lg:scroll-mt-28 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <h2 id="dtf-summary-title" className="text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary">
              {copy.summaryTitle}
            </h2>
            <dl className="mt-8 border-t border-border">
              {rows.map((row) => (
                <div key={row.name} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-b border-border py-4">
                  <dt className="text-xs leading-6 font-black uppercase tracking-[0.12em] text-text-secondary">{row.label}</dt>
                  <dd className="text-base leading-6 font-bold tabular-nums text-text-primary">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm leading-6 text-text-secondary">
              {copy.perMetre}. {copy.estimateNote}
            </p>
            {brand.email || brand.whatsapp ? (
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-sm font-bold text-text-primary">{copy.artworkTitle}</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{copy.artworkText}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {brand.email ? (
                    <a href={dtfEmailUrl(locale, request, brand.email)} className={contactButtonClass}>
                      <Mail className="size-4 shrink-0" aria-hidden="true" />
                      {copy.emailButton}
                    </a>
                  ) : null}
                  {brand.whatsapp ? (
                    <TrackedLink
                      href={whatsappUrl(dtfWhatsappMessage(locale, request))}
                      eventName="whatsapp_click"
                      eventParameters={{ link_location: "dtf_tool" }}
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
                {brand.email ? (
                  <div className="mt-8 w-full max-w-[50ch] border-t border-border pt-6">
                    <p className="text-sm leading-6 text-text-secondary">{copy.successArtwork}</p>
                    <a href={dtfEmailUrl(locale, request, brand.email)} className={`mt-4 ${contactButtonClass}`}>
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
                  className={`mt-9 min-h-12 border border-border px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors duration-300 hover:border-accent hover:text-accent ${focusRing}`}
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
                <input type="hidden" name="dtf_filme_cm" value={Math.round(layout.length)} />
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextInput id="dtf-name" name="name" label={copy.name} autoComplete="name" error={errors.name} required />
                  <TextInput id="dtf-company" name="company" label={copy.company} autoComplete="organization" optional optionalLabel={copy.optional} />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextInput id="dtf-email" name="email" type="email" label={copy.email} autoComplete="email" error={errors.email} required />
                  <TextInput id="dtf-phone" name="phone" type="tel" label={copy.phone} autoComplete="tel" error={errors.phone} required />
                </div>
                <TextArea id="dtf-message" name="message" label={copy.message} placeholder={copy.messagePlaceholder} optional optionalLabel={copy.optional} />
                <p className="-mt-3 text-sm leading-6 text-text-secondary">{copy.formArtworkNote}</p>
                <div>
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-text-secondary">
                    <input
                      name="privacy"
                      type="checkbox"
                      className="mt-1 size-5 shrink-0 accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      aria-invalid={Boolean(errors.privacy)}
                      aria-describedby={errors.privacy ? "dtf-privacy-error" : undefined}
                    />
                    <span>{copy.privacy}</span>
                  </label>
                  {errors.privacy ? (
                    <p id="dtf-privacy-error" role="alert" className="mt-2 text-sm text-[#ff9c78]">
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
                  className={`flex min-h-14 items-center justify-center gap-3 bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-light-text transition-colors duration-300 hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70 ${focusRing}`}
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
