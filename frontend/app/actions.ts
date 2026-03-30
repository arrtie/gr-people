"use server";

import { revalidatePath } from "next/cache";

const backendBaseUrl = process.env.BACKEND_INTERNAL_URL ?? "http://127.0.0.1:3001";

export async function createPersonAction(formData: FormData): Promise<void> {
  const rawName = formData.get("name");
  const name = typeof rawName === "string" ? rawName.trim() : "";

  if (!name) {
    throw new Error("Name is required");
  }

  const res = await fetch(`${backendBaseUrl}/people`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  revalidatePath("/");
}
