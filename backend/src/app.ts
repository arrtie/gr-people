import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { Hono } from "hono";
import { cors } from "hono/cors";
import * as schema from "./db/schema";

export type AppDb = PostgresJsDatabase<typeof schema>;

function toApiPerson(row: schema.PersonRow) {
  return {
    id: row.id,
    name: row.name,
    created_at: row.createdAt,
    updated_at: row.updatedAt,
  };
}

export function createApp(db: AppDb) {
  const app = new Hono();

  app.use(
    "*",
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: ["Content-Type"],
    }),
  );

  app.get("/people", async (c) => {
    const rows = await db.select().from(schema.people);
    return c.json(rows.map(toApiPerson));
  });

  app.post("/people", async (c) => {
      let body: unknown;
      try {
        body = await c.req.json();
      } catch {
        return c.json({ error: "invalid JSON" }, 400);
      }
      const name =
        body &&
        typeof body === "object" &&
        "name" in body &&
        typeof (body as { name: unknown }).name === "string"
          ? (body as { name: string }).name
          : "";
      const trimmed = name.trim();
      if (!trimmed) {
        return c.json({ error: "name is required" }, 400);
      }
      const now = Date.now();
      const [row] = await db
        .insert(schema.people)
        .values({
          name: trimmed,
          createdAt: now,
          updatedAt: now,
        })
        .returning();
      if (!row) {
        return c.json({ error: "insert failed" }, 500);
      }
      return c.json(toApiPerson(row), 201);
  });

  app.get("/health", (c) => c.json({ ok: true }));

  return app;
}
