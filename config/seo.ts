import { brand } from "@/config/brand";

export const businessId = `${brand.website}#business`;
export const logoId = `${brand.website}#logo`;

export const businessAlternateNames = [
  "Serifil",
  "Serifil Serigrafia",
  "Serifil Guimarães",
];

type BusinessIdentityOptions = {
  description: string;
  inLanguage: string;
  mainEntityOfPage: string;
};

export function getBusinessIdentity({
  description,
  inLanguage,
  mainEntityOfPage,
}: BusinessIdentityOptions) {
  const taxId = brand.taxId.replace(/\D/g, "");

  return {
    "@type": "LocalBusiness",
    "@id": businessId,
    name: brand.name,
    alternateName: businessAlternateNames,
    description,
    disambiguatingDescription:
      "Empresa portuguesa de serigrafia e personalização sediada em Guimarães, identificada pelo website oficial serifil.com.",
    url: brand.website,
    mainEntityOfPage,
    inLanguage,
    image: `${brand.website}og.jpg`,
    logo: {
      "@type": "ImageObject",
      "@id": logoId,
      url: `${brand.website}images/brand/serifil-logo-512.png`,
      contentUrl: `${brand.website}images/brand/serifil-logo-512.png`,
      width: 512,
      height: 512,
      caption: "Símbolo oficial da SERIFIL",
    },
    ...(brand.phone ? { telephone: brand.phone } : {}),
    ...(brand.email ? { email: brand.email } : {}),
    ...(brand.openingHours ? { openingHours: brand.openingHours } : {}),
    ...(taxId ? { taxID: taxId, vatID: `PT${taxId}` } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guimarães",
      addressRegion: "Braga",
      addressCountry: "PT",
      ...(brand.address ? { streetAddress: brand.address } : {}),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: brand.latitude,
      longitude: brand.longitude,
    },
    hasMap: brand.mapsUrl,
    areaServed: [
      { "@type": "City", name: "Guimarães" },
      { "@type": "AdministrativeArea", name: "Braga" },
      { "@type": "Country", name: "Portugal" },
    ],
    knowsAbout: [
      "Serigrafia",
      "Impressão em PVC",
      "Impressão em tecido",
      "Impressão em TNT",
      "Sacos personalizados",
      "Componentes para calçado",
    ],
    ...(brand.socialProfiles.length ? { sameAs: brand.socialProfiles } : {}),
    ...(brand.phone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            telephone: brand.phone,
            contactType: "sales",
            availableLanguage: ["Portuguese", "English"],
            areaServed: "PT",
          },
        }
      : {}),
  };
}
