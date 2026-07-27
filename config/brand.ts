type BrandConfig = {
  name: string;
  descriptor: string;
  heroLineOne: string;
  heroLineTwo: string;
  secondaryTagline: string;
  location: string;
  phone: string;
  email: string;
  whatsapp: string;
  instagram: string;
  address: string;
  openingHours: string;
  website: string;
  quoteEndpoint: string;
  latitude: number;
  longitude: number;
  mapsUrl: string;
  mapEmbedUrl: string;
};

export const brand: BrandConfig = {
  name: "SERIFIL",
  descriptor: "Serigrafia & Personalização",
  heroLineOne: "Imprimimos ideias.",
  heroLineTwo: "Entregamos resultados.",
  secondaryTagline: "Impressão especializada para o setor do calçado.",
  location: "Guimarães, Portugal",
  phone: "",
  email: "",
  whatsapp: "",
  instagram: "",
  address: "Travessa Bernardino Jordão 90, Urgezes",
  openingHours: "",
  website: "https://serifil.com/",
  quoteEndpoint: "https://formspree.io/f/xzdnyead",
  latitude: 41.4279368,
  longitude: -8.2991756,
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=41.4279368%2C-8.2991756",
  mapEmbedUrl: "https://www.google.com/maps?q=41.4279368,-8.2991756&z=17&output=embed",
};
