import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.name,
    description:
      "Serigrafia e personalização em PVC, tecido e TNT em Guimarães, Portugal.",
    start_url: "/",
    display: "browser",
    background_color: "#111210",
    theme_color: "#111210",
    icons: [
      {
        src: "/images/brand/serifil-logo-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
