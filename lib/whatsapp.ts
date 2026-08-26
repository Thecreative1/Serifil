import { brand } from "@/config/brand";

/**
 * Constrói o link wa.me a partir de `brand.whatsapp`, com mensagem pré-preenchida
 * opcional. O texto é sempre codificado para não partir em clientes que não
 * aceitam acentos crus no parâmetro `text`.
 */
export function whatsappUrl(message?: string) {
  const number = brand.whatsapp.replace(/\D/g, "");
  const base = `https://wa.me/${number}`;
  const text = message?.trim();

  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
