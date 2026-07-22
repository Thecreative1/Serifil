"use client";

import { CheckCircle2, FileUp, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { FieldShell, SelectInput, TextArea, TextInput } from "@/components/ui/FormField";

type FormErrors = Partial<Record<"name" | "email" | "phone" | "service" | "quantity" | "date" | "message" | "privacy", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [fileName, setFileName] = useState("");

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
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setStatus("success");
    form.reset();
    setFileName("");
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
              <p>Este formulário simula o envio nesta primeira versão.</p>
              <p className="mt-2">Os dados e o ficheiro não são transmitidos nem armazenados.</p>
            </div>
          </div>

          {status === "success" ? (
            <div className="flex min-h-[520px] flex-col items-start justify-center border border-border bg-surface p-7 sm:p-12" role="status" tabIndex={-1}>
              <CheckCircle2 className="size-12 text-accent" aria-hidden="true" />
              <h3 className="mt-7 max-w-[16ch] text-4xl font-bold tracking-[-0.05em] text-text-primary sm:text-5xl">Pedido recebido.</h3>
              <p className="mt-5 max-w-[50ch] text-lg leading-8 text-text-secondary">Entraremos em contacto assim que possível.</p>
              <p className="mt-3 text-sm text-[#777c74]">Demonstração: nenhum dado foi enviado.</p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-9 min-h-12 border border-border px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Criar outro pedido</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-6" aria-label="Formulário de pedido de orçamento">
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
              <FieldShell id="file" label="Ficheiro" optional>
                <label htmlFor="file" className="flex min-h-28 cursor-pointer flex-col items-center justify-center border border-dashed border-[#565b53] bg-surface px-5 py-6 text-center transition-colors hover:border-accent focus-within:border-accent">
                  <FileUp className="size-6 text-accent" aria-hidden="true" />
                  <span className="mt-3 text-sm font-semibold text-text-primary">{fileName || "Escolher ficheiro"}</span>
                  <span className="mt-1 text-xs text-text-secondary">PDF, AI, EPS, SVG, PNG ou JPG, até 10 MB</span>
                  <input id="file" name="file" type="file" accept=".pdf,.ai,.eps,.svg,.png,.jpg,.jpeg" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} />
                </label>
              </FieldShell>
              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-text-secondary">
                  <input name="privacy" type="checkbox" className="mt-1 size-5 shrink-0 accent-[#e85b2a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? "privacy-error" : undefined} />
                  <span>Autorizo o tratamento destes dados apenas para resposta ao pedido de orçamento.</span>
                </label>
                {errors.privacy ? <p id="privacy-error" role="alert" className="mt-2 text-sm text-[#ff9c78]">{errors.privacy}</p> : null}
              </div>
              <button type="submit" disabled={status === "submitting"} className="flex min-h-14 items-center justify-center gap-3 bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-light-text transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                {status === "submitting" ? <><LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> A preparar pedido</> : "Enviar pedido"}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
