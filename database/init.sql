CREATE TABLE IF NOT EXISTS people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  name text NOT NULL,
  created_at bigint NOT NULL,
  updated_at bigint NOT NULL
);
