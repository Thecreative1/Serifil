import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      // A exportação estática serve <img> com srcSet manual; next/image ficaria sempre unoptimized.
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "dist/**", "build/**", "next-env.d.ts"]),
]);
