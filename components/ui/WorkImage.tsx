import { assetPath } from "@/config/paths";

const variantWidths = [480, 960] as const;
const baseWidth = 1600;
const baseHeight = 1200;

type WorkImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
};

export function WorkImage({ src, alt, sizes, priority = false }: WorkImageProps) {
  const srcSet = [
    ...variantWidths.map((width) => `${assetPath(src.replace(/\.webp$/, `-${width}w.webp`))} ${width}w`),
    `${assetPath(src)} ${baseWidth}w`,
  ].join(", ");

  return (
    <img
      src={assetPath(src)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={baseWidth}
      height={baseHeight}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
