export type Service = {
  number: string;
  title: string;
  description: string;
  emphasis: "primary" | "supporting" | "complementary";
  label: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Sacos em PVC, tecido e TNT",
    description:
      "Impressão de logótipos e elementos de marca em sacos para apresentação, proteção, acondicionamento e utilização promocional.",
    emphasis: "primary",
    label: "Principal especialidade",
  },
  {
    number: "02",
    title: "Capas e porta-fatos",
    description:
      "Impressão em capas e porta-fatos de tecido ou TNT para vestuário, hotelaria, comércio, marcas e confeção.",
    emphasis: "supporting",
    label: "Produção frequente",
  },
  {
    number: "03",
    title: "Componentes para calçado",
    description:
      "Impressão e personalização de palmilhas, palas e outros componentes utilizados na produção de calçado.",
    emphasis: "supporting",
    label: "Produção especializada",
  },
  {
    number: "04",
    title: "Serigrafia têxtil e roupa profissional",
    description:
      "Impressão em t-shirts, sweatshirts, uniformes, vestuário profissional e outros artigos têxteis.",
    emphasis: "complementary",
    label: "Serviço complementar",
  },
  {
    number: "05",
    title: "Produção personalizada para empresas",
    description:
      "Impressão de artigos para empresas, marcas, hotelaria, comércio, associações, campanhas e eventos, adaptada a cada projeto.",
    emphasis: "complementary",
    label: "Serviço complementar",
  },
  {
    number: "06",
    title: "Gravação e corte laser",
    description:
      "Gravação e corte de madeira, acrílico e outros materiais para placas, brindes, decoração, protótipos e sinalética.",
    emphasis: "complementary",
    label: "Serviço complementar",
  },
];
