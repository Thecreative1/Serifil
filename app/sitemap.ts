import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export const dynamic = "force-static";

const localizedUrls = {
  "pt-PT": `${brand.website}pt/`,
  en: `${brand.website}en/`,
  "x-default": brand.website,
};
const images = [
  `${brand.website}images/hero-serigrafia.webp`,
  `${brand.website}og.png`,
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

  return [
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
}
