"use client";

import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { SelectInput, TextArea, TextInput } from "@/components/ui/FormField";
import { brand } from "@/config/brand";
import type { SiteContent } from "@/data/i18n";
import { trackEvent } from "@/lib/analytics";

type FormErrors = Partial<Record<"name" | "email" | "phone" | "service" | "quantity" | "date" | "message" | "privacy", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getLocalToday() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
}

export function QuoteForm({ copy }: { copy: SiteContent["quoteForm"] }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const successRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dateInputRef.current) dateInputRef.current.min = getLocalToday();
  }, [status]);

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
    if (!value("service")) nextErrors.service = copy.errors.service;
    if (!value("quantity")) nextErrors.quantity = copy.errors.quantity;
    if (!value("date")) {
      nextErrors.date = copy.errors.date;
    } else if (value("date") < getLocalToday()) {
      nextErrors.date = copy.errors.pastDate;
    }
    if (value("message").length < 15) nextErrors.message = copy.errors.message;
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

      trackEvent("generate_lead", { form_name: "quote_request" });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="orcamento" className="scroll-mt-20 bg-background py-20 sm:py-28 lg:scroll-mt-24 lg:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <div>
            <p className="section-kicker text-accent">{copy.eyebrow}</p>
            <h2 className="mt-8 text-[clamp(2.7rem,5.5vw,5.6rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary">{copy.title}</h2>
            <p className="mt-7 max-w-[46ch] text-base leading-7 text-text-secondary sm:text-lg">{copy.description}</p>
            <div className="mt-10 border-t border-border pt-6 text-sm leading-6 text-text-secondary">
              <p>{copy.noteOne}</p>
              <p className="mt-2">{copy.noteTwo}</p>
            </div>
          </div>

          {status === "success" ? (
            <div ref={successRef} className="flex min-h-[520px] flex-col items-start justify-center border border-border bg-surface p-7 sm:p-12" role="status" tabIndex={-1}>
              <CheckCircle2 className="size-12 text-accent" aria-hidden="true" />
              <h3 className="mt-7 max-w-[16ch] text-4xl font-bold tracking-[-0.05em] text-text-primary sm:text-5xl">{copy.successTitle}</h3>
              <p className="mt-5 max-w-[50ch] text-lg leading-8 text-text-secondary">{copy.successDescription}</p>
              <button type="button" onClick={() => { setErrors({}); setStatus("idle"); }} className="mt-9 min-h-12 border border-border px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{copy.anotherRequest}</button>
            </div>
          ) : (
            <form action={brand.quoteEndpoint} method="POST" onSubmit={handleSubmit} noValidate className="grid gap-6" aria-label={copy.formLabel} aria-busy={status === "submitting"}>
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="grid gap-6 sm:grid-cols-2">
                <TextInput id="name" name="name" label={copy.name} autoComplete="name" error={errors.name} required />
                <TextInput id="company" name="company" label={copy.company} autoComplete="organization" optional optionalLabel={copy.optional} />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <TextInput id="email" name="email" type="email" label={copy.email} autoComplete="email" error={errors.email} required />
                <TextInput id="phone" name="phone" type="tel" label={copy.phone} autoComplete="tel" error={errors.phone} required />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <SelectInput id="service" name="service" label={copy.service} error={errors.service} required defaultValue="">
                  <option value="" disabled>{copy.selectOption}</option>
                  {copy.serviceOptions.map((option) => <option key={option}>{option}</option>)}
                </SelectInput>
                <TextInput id="quantity" name="quantity" label={copy.quantity} inputMode="numeric" placeholder={copy.quantityPlaceholder} error={errors.quantity} required />
              </div>
              <TextInput inputRef={dateInputRef} id="date" name="date" type="date" label={copy.date} error={errors.date} required />
              <TextArea id="message" name="message" label={copy.message} placeholder={copy.messagePlaceholder} error={errors.message} required />
              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-text-secondary">
                  <input name="privacy" type="checkbox" className="mt-1 size-5 shrink-0 accent-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? "privacy-error" : undefined} />
                  <span>{copy.privacy}</span>
                </label>
                {errors.privacy ? <p id="privacy-error" role="alert" className="mt-2 text-sm text-error-text">{errors.privacy}</p> : null}
              </div>
              {status === "error" ? (
                <div className="flex items-start gap-3 border border-error-border bg-error-surface p-4 text-sm leading-6 text-error-text-strong" role="alert">
                  <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  <p>{copy.submissionError}</p>
                </div>
              ) : null}
              <button type="submit" disabled={status === "submitting"} className="flex min-h-14 items-center justify-center gap-3 bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-light-text transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                {status === "submitting" ? <><LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> {copy.submitting}</> : copy.submit}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
