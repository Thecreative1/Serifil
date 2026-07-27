export type PortfolioItem = {
  category: string;
  name: string;
  technique: string;
  description: string;
};

export const portfolio: PortfolioItem[] = [
  {
    category: "Sacos",
    name: "Sacos em PVC, tecido e TNT",
    technique: "Serigrafia em diferentes materiais",
    description:
      "Personalização de sacos para apresentação, proteção, embalagem, hotelaria, comércio e ações promocionais.",
  },
  {
    category: "Vestuário",
    name: "Capas e porta-fatos",
    technique: "Impressão em tecido e TNT",
    description:
      "Aplicação de logótipos em capas e porta-fatos destinados a vestuário, hotelaria, lojas e confeção.",
  },
  {
    category: "Calçado",
    name: "Componentes para calçado",
    technique: "Impressão em componentes",
    description:
      "Impressão e personalização de palmilhas, palas e outros componentes utilizados na produção de calçado.",
  },
  {
    category: "Têxtil",
    name: "Roupa profissional",
    technique: "Serigrafia têxtil",
    description:
      "Personalização de vestuário profissional para empresas, equipas, restauração, construção e outros setores.",
  },
  {
    category: "Empresas",
    name: "Produções personalizadas",
    technique: "Produção por projeto",
    description:
      "Soluções personalizadas para empresas, marcas, hotelaria, campanhas, eventos e outras aplicações.",
  },
  {
    category: "Sinalética",
    name: "Placas gravadas",
    technique: "Gravação laser",
    description: "Gravação precisa em madeira e acrílico para placas e sinalética.",
  },
];
