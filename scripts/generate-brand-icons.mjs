import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const sourcePath = path.join(
  projectRoot,
  "public",
  "images",
  "brand",
  "serifil-symbol.svg",
);
const appDirectory = path.join(projectRoot, "app");
const brandDirectory = path.join(projectRoot, "public", "images", "brand");
const background = { r: 17, g: 18, b: 16, alpha: 1 };

await mkdir(appDirectory, { recursive: true });
await mkdir(brandDirectory, { recursive: true });

const source = await readFile(sourcePath);

async function renderPng(size, palette = true) {
  return sharp(source)
    .resize(size, size)
    .flatten({ background })
    .ensureAlpha()
    .png({ compressionLevel: 9, palette })
    .toBuffer();
}

function wrapPngAsIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size === 256 ? 0 : size, 6);
  header.writeUInt8(size === 256 ? 0 : size, 7);
  header.writeUInt8(0, 8);
  header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(header.length, 18);
  return Buffer.concat([header, png]);
}

const [faviconPng, appleIcon, organizationLogo] = await Promise.all([
  renderPng(256, false),
  renderPng(180),
  renderPng(512),
]);

await Promise.all([
  writeFile(path.join(appDirectory, "favicon.ico"), wrapPngAsIco(faviconPng, 256)),
  writeFile(path.join(appDirectory, "apple-icon.png"), appleIcon),
  writeFile(path.join(brandDirectory, "serifil-logo-512.png"), organizationLogo),
]);

console.log("Generated favicon.ico, apple-icon.png and serifil-logo-512.png");
