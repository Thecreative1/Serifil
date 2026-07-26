export type PortfolioItem = {
  category: string;
  name: string;
  technique: string;
  description: string;
};

export const portfolio: PortfolioItem[] = [
  {
    category: "Calçado",
    name: "Sacos em tecido para calçado",
    technique: "Serigrafia em tecido",
    description: "Impressão de marca em sacos de proteção destinados ao setor do calçado.",
  },
  {
    category: "Calçado",
    name: "Sacos plásticos impressos",
    technique: "Impressão em plástico",
    description: "Personalização de sacos plásticos para acondicionamento e apresentação de calçado.",
  },
  {
    category: "Vestuário",
    name: "Capas guarda-fatos",
    technique: "Impressão em capas",
    description: "Aplicação de logótipos em capas de proteção para fatos e outras peças de vestuário.",
  },
  {
    category: "Merchandising",
    name: "Sweatshirts personalizadas",
    technique: "Impressão direta",
    description: "Produção têxtil personalizada para marcas, equipas e iniciativas.",
  },
  {
    category: "Sinalética",
    name: "Placas gravadas",
    technique: "Gravação laser",
    description: "Gravação precisa em madeira e acrílico para placas e sinalética.",
  },
  {
    category: "Equipas",
    name: "Roupa profissional",
    technique: "Serigrafia têxtil",
    description: "Personalização coordenada para vestuário de trabalho e equipas.",
  },
];
