import type { NextConfig } from "next";

const basePath = "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  experimental: {
    globalNotFound: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
