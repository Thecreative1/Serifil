"use client";

import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { SelectInput, TextArea, TextInput } from "@/components/ui/FormField";
import { brand } from "@/config/brand";

type FormErrors = Partial<Record<"name" | "email" | "phone" | "service" | "quantity" | "date" | "message" | "privacy", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(form: HTMLFormElement) {
    const formData = new FormData(form);
    const nextErrors: FormErrors = {};
    const value = (name: string) => String(formData.get(name) ?? "").trim();

    if (!value("name")) nextErrors.name = "Indique o seu nome.";
    if (!emailPattern.test(value("email"))) nextErrors.email = "Introduza um endereço de e-mail válido.";
    if (!value("phone")) nextErrors.phone = "Indique um contacto telefónico.";
    if (!value("service")) nextErrors.service = "Selecione o serviço pretendido.";
    if (!value("quantity")) nextErrors.quantity = "Indique uma quantidade aproximada.";
    if (!value("date")) nextErrors.date = "Indique a data pretendida.";
    if (value("message").length < 15) nextErrors.message = "Descreva o projeto com pelo menos 15 caracteres.";
    if (formData.get("privacy") !== "on") nextErrors.privacy = "É necessário aceitar o tratamento dos dados deste pedido.";

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const formData = new FormData(form);
    formData.set("_subject", "Novo pedido de orçamento através do site Serifil");

    try {
      const response = await fetch(brand.quoteEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error("Form submission failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="orcamento" className="scroll-mt-20 bg-background py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <div>
            <p className="section-kicker text-accent">PEDIDO DE ORÇAMENTO</p>
            <h2 className="mt-8 text-[clamp(2.7rem,5.5vw,5.6rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary">Conte-nos o que pretende produzir.</h2>
            <p className="mt-7 max-w-[46ch] text-base leading-7 text-text-secondary sm:text-lg">Quanto mais informação enviar sobre o material, a quantidade e a data, mais clara poderá ser a análise inicial.</p>
            <div className="mt-10 border-t border-border pt-6 text-sm leading-6 text-text-secondary">
              <p>Indique o produto, o material, a quantidade e a data pretendida.</p>
              <p className="mt-2">Depois do primeiro contacto poderá enviar os ficheiros de produção.</p>
            </div>
          </div>

          {status === "success" ? (
            <div className="flex min-h-[520px] flex-col items-start justify-center border border-border bg-surface p-7 sm:p-12" role="status" tabIndex={-1}>
              <CheckCircle2 className="size-12 text-accent" aria-hidden="true" />
              <h3 className="mt-7 max-w-[16ch] text-4xl font-bold tracking-[-0.05em] text-text-primary sm:text-5xl">Pedido enviado.</h3>
              <p className="mt-5 max-w-[50ch] text-lg leading-8 text-text-secondary">Recebemos os detalhes do seu projeto e entraremos em contacto assim que possível.</p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-9 min-h-12 border border-border px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Criar outro pedido</button>
            </div>
          ) : (
            <form action={brand.quoteEndpoint} method="POST" onSubmit={handleSubmit} noValidate className="grid gap-6" aria-label="Formulário de pedido de orçamento">
              <input type="text" name="_gotcha" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="grid gap-6 sm:grid-cols-2">
                <TextInput id="name" name="name" label="Nome" autoComplete="name" error={errors.name} required />
                <TextInput id="company" name="company" label="Empresa" autoComplete="organization" optional />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <TextInput id="email" name="email" type="email" label="E-mail" autoComplete="email" error={errors.email} required />
                <TextInput id="phone" name="phone" type="tel" label="Telefone" autoComplete="tel" error={errors.phone} required />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <SelectInput id="service" name="service" label="Serviço pretendido" error={errors.service} required defaultValue="">
                  <option value="" disabled>Selecione uma opção</option>
                  <option>Impressão em plástico ou sacos</option>
                  <option>Serigrafia têxtil</option>
                  <option>Roupa profissional</option>
                  <option>Merchandising</option>
                  <option>Gravação ou corte laser</option>
                  <option>Outro</option>
                </SelectInput>
                <TextInput id="quantity" name="quantity" label="Quantidade aproximada" inputMode="numeric" placeholder="Ex.: 250 unidades" error={errors.quantity} required />
              </div>
              <TextInput id="date" name="date" type="date" label="Data pretendida" error={errors.date} required />
              <TextArea id="message" name="message" label="Mensagem" placeholder="Indique o produto, material, número de cores e outras informações úteis." error={errors.message} required />
              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-text-secondary">
                  <input name="privacy" type="checkbox" className="mt-1 size-5 shrink-0 accent-[#e85b2a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? "privacy-error" : undefined} />
                  <span>Autorizo o tratamento destes dados para resposta ao pedido de orçamento.</span>
                </label>
                {errors.privacy ? <p id="privacy-error" role="alert" className="mt-2 text-sm text-[#ff9c78]">{errors.privacy}</p> : null}
              </div>
              {status === "error" ? (
                <div className="flex items-start gap-3 border border-[#7f3f2b] bg-[#261713] p-4 text-sm leading-6 text-[#ffb49a]" role="alert">
                  <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  <p>Não foi possível enviar o pedido. Verifique a ligação e tente novamente.</p>
                </div>
              ) : null}
              <button type="submit" disabled={status === "submitting"} className="flex min-h-14 items-center justify-center gap-3 bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-light-text transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                {status === "submitting" ? <><LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> A enviar pedido</> : "Enviar pedido"}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
