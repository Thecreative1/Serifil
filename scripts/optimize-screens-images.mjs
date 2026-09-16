import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourcePath = path.resolve(process.cwd(), "../fotos serifil/guias/telas.jpg");
const outputDirectory = path.resolve(process.cwd(), "public/images/quadros");

// Imagem de partilha (Open Graph) da página de quadros: 1200×630 em JPEG, o formato mais aceite pelas redes.
// A fotografia é de um parceiro que trabalha para a SERIFIL: descrever só o que se vê, nunca como instalações da SERIFIL.
await fs.mkdir(outputDirectory, { recursive: true });

const outputPath = path.join(outputDirectory, "quadros-serigrafia-og.jpg");
const info = await sharp(sourcePath)
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "centre", withoutEnlargement: true })
  .sharpen({ sigma: 0.45, m1: 0.8, m2: 1.4 })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(outputPath);

console.log(`telas.jpg -> ${path.relative(process.cwd(), outputPath)} (${info.width}x${info.height}, ${info.size} bytes)`);
