export type Service = {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Impressão em plástico e sacos",
    description:
      "Impressão para sacos de comércio, embalagens plásticas e sacos destinados ao setor do calçado, com análise do material e do acabamento pretendido.",
    image: "/images/projects/project-01.webp",
    imageAlt: "Sacos plásticos impressos preparados numa mesa de produção",
  },
  {
    number: "02",
    title: "Serigrafia têxtil e roupa profissional",
    description:
      "Impressão resistente para t-shirts, sweatshirts, uniformes, sacos têxteis e vestuário de equipas, comércio, construção e restauração.",
    image: "/images/projects/project-03.webp",
    imageAlt: "Peças têxteis personalizadas em fase de controlo de qualidade",
  },
  {
    number: "03",
    title: "Merchandising e eventos",
    description:
      "Produção personalizada para empresas, associações, campanhas, festas, eventos e projetos locais, adaptada à necessidade de cada pedido.",
    image: "/images/projects/project-04.webp",
    imageAlt: "Sweatshirts personalizadas organizadas após impressão",
  },
  {
    number: "04",
    title: "Gravação e corte laser",
    description:
      "Gravação e corte de madeira, acrílico e outros materiais para placas, brindes, decoração, protótipos e sinalética.",
    image: "/images/projects/project-05.webp",
    imageAlt: "Máquina laser a gravar uma placa de madeira",
  },
];
