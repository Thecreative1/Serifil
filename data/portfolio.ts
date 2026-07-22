export type PortfolioItem = {
  category: string;
  name: string;
  technique: string;
  description: string;
  image: string;
  alt: string;
  size: "wide" | "tall" | "standard";
};

export const portfolio: PortfolioItem[] = [
  {
    category: "Embalagem",
    name: "Sacos para comércio",
    technique: "Impressão em plástico",
    description: "Projeto demonstrativo de aplicação de uma cor em sacos de asa recortada.",
    image: "/images/projects/project-01.webp",
    alt: "Exemplo demonstrativo de sacos plásticos impressos para comércio",
    size: "wide",
  },
  {
    category: "Calçado",
    name: "Sacos de proteção",
    technique: "Serigrafia em plástico",
    description: "Projeto demonstrativo para acondicionamento de produtos do setor do calçado.",
    image: "/images/projects/project-02.webp",
    alt: "Exemplo demonstrativo de sacos longos para acondicionamento de calçado",
    size: "tall",
  },
  {
    category: "Equipas",
    name: "Roupa profissional",
    technique: "Serigrafia têxtil",
    description: "Exemplo de personalização coerente para vestuário de trabalho.",
    image: "/images/projects/project-03.webp",
    alt: "Exemplo demonstrativo de roupa profissional personalizada",
    size: "standard",
  },
  {
    category: "Merchandising",
    name: "Sweatshirts personalizadas",
    technique: "Impressão direta",
    description: "Projeto demonstrativo de produção têxtil para uma iniciativa local.",
    image: "/images/projects/project-04.webp",
    alt: "Exemplo demonstrativo de sweatshirts personalizadas",
    size: "tall",
  },
  {
    category: "Sinalética",
    name: "Placas gravadas",
    technique: "Gravação laser",
    description: "Amostra demonstrativa de gravação precisa em madeira e acrílico.",
    image: "/images/projects/project-05.webp",
    alt: "Exemplo demonstrativo de placas gravadas a laser",
    size: "wide",
  },
  {
    category: "Produção local",
    name: "Série para marca independente",
    technique: "Serigrafia",
    description: "Exemplo de acompanhamento desde a preparação do ficheiro até ao acabamento.",
    image: "/images/projects/project-06.webp",
    alt: "Exemplo demonstrativo de produção serigráfica para uma marca local",
    size: "standard",
  },
];
