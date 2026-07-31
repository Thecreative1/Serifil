import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { locales } from "@/data/i18n";
import {
  getServiceAlternates,
  getServicePath,
  serviceKeys,
  servicePages,
} from "@/data/service-pages";

export const dynamic = "force-static";

const localizedUrls = {
  "pt-PT": `${brand.website}pt/`,
  en: `${brand.website}en/`,
  "x-default": `${brand.website}pt/`,
};
const images = [
  `${brand.website}images/hero-serigrafia.webp`,
  `${brand.website}og.jpg`,
  ...[
    "pvc-01",
    "pvc-02",
    "pvc-03",
    "tecido-01",
    "tecido-02",
    "tecido-03",
    "tecido-04",
    "tnt-01",
    "tnt-02",
    "tnt-03",
    "tnt-04",
    "tnt-05",
  ].map((name) => `${brand.website}images/trabalhos/${name}.webp`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const homePages: MetadataRoute.Sitemap = [
    {
      url: localizedUrls["pt-PT"],
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: localizedUrls },
      images,
    },
    {
      url: localizedUrls.en,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: localizedUrls },
      images,
    },
  ];

  const detailPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    serviceKeys.map((key) => {
      const page = servicePages[locale][key];
      const alternates = getServiceAlternates(key);
      return {
        url: new URL(getServicePath(locale, key), brand.website).toString(),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            "pt-PT": new URL(alternates["pt-PT"], brand.website).toString(),
            en: new URL(alternates.en, brand.website).toString(),
            "x-default": new URL(alternates["x-default"], brand.website).toString(),
          },
        },
        images: [
          page.image,
          ...page.gallery.images,
        ].map((image) => new URL(image.src, brand.website).toString()),
      };
    }),
  );

  return [...homePages, ...detailPages];
}
