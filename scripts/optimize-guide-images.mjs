import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.resolve(process.cwd(), "../fotos serifil/guias");
const outputDirectory = path.resolve(process.cwd(), "public/images/guias");

// Fotografias de equipamento de preparação (parceiro da SERIFIL): 16:9 para planos gerais, 4:5 para equipamento vertical.
const images = [
  { source: "telas.jpg", output: "telas-serigrafia.webp", width: 1440, height: 810, position: "centre" },
  { source: "esticador.jpg", output: "esticador-telas.webp", width: 1440, height: 810, position: "centre" },
  { source: "mesa-exposicao.jpg", output: "mesa-exposicao.webp", width: 1440, height: 810, position: "centre" },
  {
    source: "filmadora.jpg",
    output: "filmadora-fotolitos.webp",
    width: 900,
    height: 1125,
    position: "centre",
    extract: { left: 0, top: 280, width: 955, height: 1194 },
  },
];

await fs.mkdir(outputDirectory, { recursive: true });

for (const image of images) {
  const sourcePath = path.join(sourceDirectory, image.source);
  const outputPath = path.join(outputDirectory, image.output);
  let pipeline = sharp(sourcePath).rotate();

  if (image.extract) pipeline = pipeline.extract(image.extract);

  const info = await pipeline
    .resize(image.width, image.height, {
      fit: "cover",
      position: image.position,
      withoutEnlargement: true,
    })
    .sharpen({ sigma: 0.45, m1: 0.8, m2: 1.4 })
    .webp({ quality: 84, effort: 6, smartSubsample: true })
    .toFile(outputPath);

  console.log(`${image.source} -> ${path.relative(process.cwd(), outputPath)} (${info.width}x${info.height})`);
}
