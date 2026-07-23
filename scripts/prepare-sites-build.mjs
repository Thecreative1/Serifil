import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "out");
const distDir = path.join(root, "dist");
const clientDir = path.join(distDir, "client");
const serverDir = path.join(distDir, "server");

await rm(distDir, { recursive: true, force: true });
await mkdir(clientDir, { recursive: true });
await mkdir(serverDir, { recursive: true });
await cp(outputDir, clientDir, { recursive: true });

const worker = `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const url = new URL(request.url);
    const notFoundRequest = new Request(new URL("/404.html", url), request);
    const notFoundResponse = await env.ASSETS.fetch(notFoundRequest);

    return new Response(notFoundResponse.body, {
      status: 404,
      headers: notFoundResponse.headers,
    });
  },
};
`;

await writeFile(path.join(serverDir, "index.js"), worker, "utf8");
