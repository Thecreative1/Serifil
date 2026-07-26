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
    title: "Sacos em tecido para calçado",
    description:
      "Impressão de logótipos e elementos de marca em sacos de tecido utilizados para proteger e apresentar calçado.",
    emphasis: "primary",
    label: "Principal especialidade",
  },
  {
    number: "02",
    title: "Sacos plásticos impressos",
    description:
      "Personalização de sacos plásticos para calçado, comércio e embalagem, de acordo com o material e a imagem pretendida.",
    emphasis: "supporting",
    label: "Produção frequente",
  },
  {
    number: "03",
    title: "Capas guarda-fatos",
    description:
      "Impressão em capas guarda-fatos, também conhecidas como porta-fatos, para marcas de vestuário, lojas e confeção.",
    emphasis: "supporting",
    label: "Produção especializada",
  },
  {
    number: "04",
    title: "Serigrafia têxtil e roupa profissional",
    description:
      "Impressão resistente para t-shirts, sweatshirts, uniformes e vestuário de equipas, comércio, construção e restauração.",
    emphasis: "complementary",
    label: "Serviço complementar",
  },
  {
    number: "05",
    title: "Merchandising e eventos",
    description:
      "Produção personalizada para empresas, associações, campanhas, festas, eventos e projetos locais, adaptada à necessidade de cada pedido.",
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
