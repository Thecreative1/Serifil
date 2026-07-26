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
    description: "Projeto demonstrativo de aplicação de uma cor em sacos de asa recortada.",
  },
  {
    category: "Calçado",
    name: "Sacos de proteção",
    technique: "Serigrafia em plástico",
    description: "Projeto demonstrativo para acondicionamento de produtos do setor do calçado.",
  },
  {
    category: "Equipas",
    name: "Roupa profissional",
    technique: "Serigrafia têxtil",
    description: "Exemplo de personalização coerente para vestuário de trabalho.",
  },
  {
    category: "Merchandising",
    name: "Sweatshirts personalizadas",
    technique: "Impressão direta",
    description: "Projeto demonstrativo de produção têxtil para uma iniciativa local.",
  },
  {
    category: "Sinalética",
    name: "Placas gravadas",
    technique: "Gravação laser",
    description: "Amostra demonstrativa de gravação precisa em madeira e acrílico.",
  },
  {
    category: "Produção local",
    name: "Série para marca independente",
    technique: "Serigrafia",
    description: "Exemplo de acompanhamento desde a preparação do ficheiro até ao acabamento.",
  },
];
