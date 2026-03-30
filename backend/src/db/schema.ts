import { bigint, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const people = pgTable("people", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
  updatedAt: bigint("updated_at", { mode: "number" }).notNull(),
});

export type PersonRow = typeof people.$inferSelect;
