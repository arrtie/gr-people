import type { Person } from "@shared/types";

const peoplePath = "/api/people";

export async function createPerson(name: string): Promise<Person> {
  const res = await fetch(peoplePath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<Person>;
}

export async function fetchPeople(): Promise<Person[]> {
  const res = await fetch(peoplePath);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<Person[]>;
}
