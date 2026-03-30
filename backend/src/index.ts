import { serve } from "@hono/node-server";
import { createApp } from "./app";
import { createDb } from "./db/client";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const { db } = createDb(databaseUrl);
const app = createApp(db);

const port = Number(process.env.PORT) || 3001;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Listening on http://localhost:${String(info.port)}`);
});
