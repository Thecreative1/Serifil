const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

export function localizedPath(locale: "pt" | "en", hash = "") {
  return `${basePath}/${locale}/${hash}`;
}
