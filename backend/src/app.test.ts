import { createApp } from "./app";
import { createDb } from "./db/client";
import * as schema from "./db/schema";

const databaseUrl = process.env.DATABASE_URL;

const describeIntegration = databaseUrl ? describe : describe.skip;

describeIntegration("API (integration)", () => {
  const { db, sql: pg } = createDb(databaseUrl!);

  beforeAll(async () => {
    await pg`
      CREATE TABLE IF NOT EXISTS people (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        name text NOT NULL,
        created_at bigint NOT NULL,
        updated_at bigint NOT NULL
      )
    `;
  });

  beforeEach(async () => {
    await db.delete(schema.people);
  });

  afterAll(async () => {
    await pg.end({ timeout: 5 });
  });

  it("POST /people creates a person", async () => {
    const app = createApp(db);
    const res = await app.request("http://localhost/people", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Ada" }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as {
      id: string;
      name: string;
      created_at: number;
      updated_at: number;
    };
    expect(body.name).toBe("Ada");
    expect(body.id).toBeTruthy();
  });

  it("GET /people returns all people when rows exist", async () => {
    const app = createApp(db);
    await app.request("http://localhost/people", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Bob" }),
    });
    const res = await app.request("http://localhost/people");
    expect(res.status).toBe(200);
    const list = (await res.json()) as { name: string }[];
    expect(list.length).toBe(1);
    expect(list[0]?.name).toBe("Bob");
  });

  it("GET /people returns an empty list when there are no people", async () => {
    const app = createApp(db);
    const res = await app.request("http://localhost/people");
    expect(res.status).toBe(200);
    const list = (await res.json()) as unknown[];
    expect(list).toEqual([]);
  });
});
