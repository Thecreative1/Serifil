export type PortfolioItem = {
  category: string;
  name: string;
  technique: string;
  description: string;
};

export const portfolio: PortfolioItem[] = [
  {
    category: "Embalagem",
    name: "Sacos para comércio",
    technique: "Impressão em plástico",
    description: "Aplicação de uma cor em sacos de asa recortada para comércio.",
  },
  {
    category: "Calçado",
    name: "Sacos de proteção",
    technique: "Serigrafia em plástico",
    description: "Produção de sacos para acondicionamento de produtos do setor do calçado.",
  },
  {
    category: "Equipas",
    name: "Roupa profissional",
    technique: "Serigrafia têxtil",
    description: "Personalização coordenada para vestuário de trabalho e equipas.",
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
    category: "Produção local",
    name: "Série para marca independente",
    technique: "Serigrafia",
    description: "Acompanhamento desde a preparação do ficheiro até ao acabamento.",
  },
];
