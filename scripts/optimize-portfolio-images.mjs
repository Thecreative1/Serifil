import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.resolve(process.cwd(), "../fotos serifil");
const outputDirectory = path.resolve(process.cwd(), "public/images/trabalhos");

const images = [
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

await fs.mkdir(outputDirectory, { recursive: true });

for (const [sourceName, outputName, position] of images) {
  const sourcePath = path.join(sourceDirectory, sourceName);
  const outputPath = path.join(outputDirectory, outputName);

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
