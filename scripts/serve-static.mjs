import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";

const root = resolve("out");
const port = 3100;
const host = "127.0.0.1";

const contentTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

async function isFile(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

function safePath(pathname) {
  const relativePath = decodeURIComponent(pathname).replace(/^\/+/, "");
  const resolvedPath = resolve(root, relativePath);
  if (resolvedPath !== root && !resolvedPath.startsWith(`${root}${sep}`)) return null;
  return resolvedPath;
}

async function resolveRequest(pathname) {
  const requestedPath = safePath(pathname);
  if (!requestedPath) return null;

  const candidates = pathname.endsWith("/")
    ? [join(requestedPath, "index.html")]
    : [requestedPath, join(requestedPath, "index.html")];

  for (const candidate of candidates) {
    if (await isFile(candidate)) return { filePath: candidate, status: 200 };
  }

  return { filePath: join(root, "404.html"), status: 404 };
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${host}:${port}`);
    const result = await resolveRequest(url.pathname);

    if (!result) {
      response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Bad request");
      return;
    }

    const fileStats = await stat(result.filePath);
    response.writeHead(result.status, {
      "Cache-Control": "no-store",
      "Content-Length": fileStats.size,
      "Content-Type": contentTypes[extname(result.filePath)] ?? "application/octet-stream",
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(result.filePath).pipe(response);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Internal server error");
  }
});

server.listen(port, host, () => {
  console.log(`Static export available at http://${host}:${port}`);
});

function closeServer() {
  server.close(() => process.exit(0));
}

process.on("SIGINT", closeServer);
process.on("SIGTERM", closeServer);
