import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.resolve(process.cwd(), "../fotos serifil");
const workDirectory = path.resolve(process.cwd(), "public/images/trabalhos");
const heroPath = path.resolve(process.cwd(), "public/images/hero-serigrafia.webp");

const workImages = [
  ["pvc1.JPG", "pvc-01.webp", "centre"],
  ["pvc2.JPG", "pvc-02.webp", "west"],
  ["pvc3.JPG", "pvc-03.webp", "centre"],
  ["textil1.JPG", "tecido-01.webp", "centre"],
  ["textil2.JPG", "tecido-02.webp", "west"],
  ["textil3.JPG", "tecido-03.webp", "west"],
  ["textil4.JPG", "tecido-04.webp", "centre"],
  ["tnt.JPG", "tnt-01.webp", "centre"],
  ["tnt1.JPG", "tnt-02.webp", "centre"],
  ["tnt2.JPG", "tnt-03.webp", "centre"],
  ["tnt3.JPG", "tnt-04.webp", "centre"],
  ["tnt4.JPG", "tnt-05.webp", "centre"],
];

const workWidths = [480, 960];
const heroWidths = [480, 828, 960, 1280];

async function exists(candidate) {
  try {
    await fs.access(candidate);
    return true;
  } catch {
    return false;
  }
}

await fs.mkdir(workDirectory, { recursive: true });

// Passo 1: regenerar as bases 1600x1200 a partir das fotografias originais, quando disponíveis.
if (await exists(sourceDirectory)) {
  for (const [sourceName, outputName, position] of workImages) {
    const sourcePath = path.join(sourceDirectory, sourceName);
    const outputPath = path.join(workDirectory, outputName);

    await sharp(sourcePath)
      .rotate()
      .resize(1600, 1200, {
        fit: "cover",
        position,
        withoutEnlargement: true,
      })
      .sharpen({ sigma: 0.45, m1: 0.8, m2: 1.4 })
      .webp({ quality: 84, effort: 6, smartSubsample: true })
      .toFile(outputPath);

    console.log(`${sourceName} -> ${path.relative(process.cwd(), outputPath)}`);
  }
} else {
  console.log(`Fotografias originais não encontradas em ${sourceDirectory}; a manter as bases publicadas.`);
}

// Passo 2: gerar variantes responsivas a partir das bases publicadas.
for (const [, outputName] of workImages) {
  const basePath = path.join(workDirectory, outputName);

  for (const width of workWidths) {
    const variantPath = basePath.replace(/\.webp$/, `-${width}w.webp`);
    await sharp(basePath)
      .resize(width, Math.round((width * 3) / 4), { fit: "cover" })
      .webp({ quality: 82, effort: 6, smartSubsample: true })
      .toFile(variantPath);

    console.log(`${outputName} -> ${path.relative(process.cwd(), variantPath)}`);
  }
}

for (const width of heroWidths) {
  const variantPath = heroPath.replace(/\.webp$/, `-${width}w.webp`);
  await sharp(heroPath)
    .resize({ width })
    .webp({ quality: 80, effort: 6, smartSubsample: true })
    .toFile(variantPath);

  console.log(`hero-serigrafia.webp -> ${path.relative(process.cwd(), variantPath)}`);
}
