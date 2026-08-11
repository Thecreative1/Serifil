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
  instagramHandle: string;
  socialProfiles: string[];
  address: string;
  openingHours: string;
  website: string;
  quoteEndpoint: string;
  latitude: number;
  longitude: number;
  mapsUrl: string;
  mapEmbedUrl: string;
  legalOwner: string;
  taxId: string;
};

export const brand: BrandConfig = {
  name: "SERIFIL",
  descriptor: "Serigrafia & Personalização",
  heroLineOne: "Imprimimos ideias.",
  heroLineTwo: "Entregamos resultados.",
  secondaryTagline: "Serigrafia e personalização em PVC, tecido e TNT.",
  location: "Guimarães, Portugal",
  phone: "+351 910 508 706",
  email: "geral@serifil.com",
  whatsapp: "+351 910 508 706",
  instagram: "https://www.instagram.com/serifil_serigrafia/",
  instagramHandle: "@serifil_serigrafia",
  socialProfiles: ["https://www.instagram.com/serifil_serigrafia/"],
  address: "Travessa Bernardino Jordão 90, Urgezes",
  openingHours: "Mo-Fr 09:00-18:00",
  website: "https://serifil.com/",
  quoteEndpoint: "https://formspree.io/f/xzdnyead",
  latitude: 41.4279368,
  longitude: -8.2991756,
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=41.4279368%2C-8.2991756",
  mapEmbedUrl: "https://www.google.com/maps?q=41.4279368,-8.2991756&z=17&output=embed",
  legalOwner: "Lisete da Silva Araújo",
  taxId: "250 796 210",
};
