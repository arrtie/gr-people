import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export function createDb(connectionString: string) {
  const sql = postgres(connectionString, { max: 10 });
  const db = drizzle(sql, { schema });
  return { db, sql };
}
