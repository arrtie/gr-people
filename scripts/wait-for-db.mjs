import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import net from "node:net";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env") });

function parseDbUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const port = u.port || (u.protocol === "postgresql:" ? "5432" : "");
    return { host: u.hostname, port: port || "5432" };
  } catch {
    return null;
  }
}

const parsed = parseDbUrl(process.env.DATABASE_URL);
const host = parsed?.host ?? process.env.PGHOST ?? "127.0.0.1";
const port = Number(parsed?.port ?? process.env.PGPORT ?? 5432);
const deadline = Date.now() + 60_000;

function tryConnect() {
  return new Promise((resolveConnect, reject) => {
    const socket = net.connect(port, host, () => {
      socket.end();
      resolveConnect(undefined);
    });
    socket.on("error", reject);
  });
}

async function main() {
  while (Date.now() < deadline) {
    try {
      await tryConnect();
      console.log(`Postgres reachable at ${host}:${String(port)}`);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error(`Timed out waiting for Postgres at ${host}:${String(port)}`);
}

await main();
