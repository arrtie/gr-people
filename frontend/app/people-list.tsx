"use client";

import useSWR from "swr";
import type { Person } from "@shared/types";
import { fetchPeople } from "@/lib/api";

const listFetcher = async (): Promise<Person[]> => fetchPeople();

export function PeopleList() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Person[]>(
    "/api/people",
    listFetcher,
    {
      refreshInterval: 3000,
      revalidateOnFocus: true,
    },
  );

  const people = data ?? null;

  return (
    <section aria-labelledby="list-heading">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "0.75rem",
        }}
      >
        <h2 id="list-heading" style={{ margin: 0, fontSize: "1.125rem" }}>
          All people
        </h2>
        <button
          type="button"
          className="secondary"
          onClick={() => void mutate()}
          disabled={isLoading || isValidating}
        >
          {isLoading || isValidating ? "Loading…" : "Refresh"}
        </button>
      </div>
      {error ? (
        <p className="error" role="alert">
          {error instanceof Error ? error.message : "Unable to load."}
        </p>
      ) : people === null ? (
        <p className="empty">{isLoading ? "Loading…" : "Unable to load."}</p>
      ) : people.length === 0 ? (
        <p className="empty">No people yet.</p>
      ) : (
        <ul className="people">
          {people.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
