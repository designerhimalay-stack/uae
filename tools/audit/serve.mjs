// node tools/audit/serve.mjs <distDir> <base> [port=4321]
// Serves a built site (e.g. a deploy worktree) under its base path ("/", "/au/", "/in/", "/uae/"),
// so the browser audits can run against any region's build without a dev server.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const [dir, base = "/", port = "4321"] = process.argv.slice(2);
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".gif": "image/gif", ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml", ".pdf": "application/pdf", ".mp4": "video/mp4" };

createServer(async (req, res) => {
  let path = decodeURIComponent((req.url || "/").split("?")[0]);
  if (!path.startsWith(base)) { res.writeHead(404); return res.end(); }
  path = normalize(join(dir, path.slice(base.length)));
  if (!path.startsWith(normalize(dir))) { res.writeHead(403); return res.end(); }
  try {
    if ((await stat(path)).isDirectory()) path = join(path, "index.html");
    const body = await readFile(path);
    res.writeHead(200, { "content-type": TYPES[extname(path).toLowerCase()] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("not found");
  }
}).listen(Number(port), () => console.log(`serving ${dir} at http://localhost:${port}${base}`));
