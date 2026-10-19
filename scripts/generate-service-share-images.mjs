import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Imagens de partilha (Open Graph) das páginas de serviço: 1200×630 em JPEG, o formato mais aceite pelas redes
// e pelo WhatsApp. Partem das mesmas fotografias usadas no topo de cada página de serviço (`page.image`).
const sources = {
  pvc: "public/images/trabalhos/pvc-01.webp",
  fabric: "public/images/trabalhos/tecido-01.webp",
  nonwoven: "public/images/trabalhos/tnt-05.webp",
  footwear: "public/images/hero-serigrafia.webp",
  tshirts: "public/images/trabalhos/tecido-04.webp",
};

const outputDirectory = path.resolve(process.cwd(), "public/images/servicos");
await fs.mkdir(outputDirectory, { recursive: true });

for (const [key, source] of Object.entries(sources)) {
  const outputPath = path.join(outputDirectory, `${key}-og.jpg`);
  const info = await sharp(path.resolve(process.cwd(), source))
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(outputPath);

  console.log(`${source} -> ${path.relative(process.cwd(), outputPath)} (${info.width}x${info.height}, ${info.size} bytes)`);
}
