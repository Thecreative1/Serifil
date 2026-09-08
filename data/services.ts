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
    title: "Serigrafia Industrial",
    description:
      "Impressão serigráfica sobre peças, componentes e suportes fornecidos pelo cliente ou integrados em projetos de produção, com preparação técnica para cada material.",
    emphasis: "primary",
    label: "Especialidade principal",
  },
  {
    number: "02",
    title: "Impressão em PVC",
    description:
      "Impressão sobre PVC transparente ou colorido para embalagem, proteção, apresentação de produto e peças técnicas.",
    emphasis: "supporting",
    label: "Capacidade de impressão",
  },
  {
    number: "03",
    title: "Impressão em Têxtil",
    description:
      "Serigrafia sobre tecido para vestuário, roupa profissional, capas, sacos, têxtil-lar e outras peças de produção.",
    emphasis: "supporting",
    label: "Capacidade de impressão",
  },
  {
    number: "04",
    title: "Impressão em TNT",
    description:
      "Impressão sobre tecido não tecido para sacos, capas e soluções de proteção e comunicação de marca.",
    emphasis: "supporting",
    label: "Capacidade de impressão",
  },
  {
    number: "05",
    title: "Impressão em Componentes",
    description:
      "Impressão e personalização de palmilhas, palas e outros componentes utilizados em linhas de produção, nomeadamente na indústria do calçado.",
    emphasis: "complementary",
    label: "Aplicação",
  },
  {
    number: "06",
    title: "Sacos Personalizados",
    description:
      "Personalização e fornecimento de sacos para aplicações industriais, comerciais e promocionais, em PVC, têxtil ou TNT.",
    emphasis: "complementary",
    label: "Aplicação",
  },
  {
    number: "07",
    title: "Porta-fatos e Capas",
    description:
      "Impressão em porta-fatos, capas e coberturas de proteção para vestuário, confeção, hotelaria e comércio.",
    emphasis: "complementary",
    label: "Aplicação",
  },
  {
    number: "08",
    title: "Projetos Especiais e Produção Personalizada",
    description:
      "Soluções desenvolvidas em conjunto para requisitos específicos, incluindo séries especiais, artigos para campanhas e eventos, gravação e corte laser.",
    emphasis: "complementary",
    label: "Produção",
  },
];
