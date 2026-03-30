/**
 * @format
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SWRConfig } from "swr";
import type { Person } from "@shared/types";

jest.mock("@/app/actions", () => ({
  createPersonAction: jest.fn(),
}));

jest.mock("@/lib/api", () => ({
  fetchPeople: jest.fn(),
}));

import HomePage from "@/app/page";
import { createPersonAction } from "@/app/actions";
import { fetchPeople } from "@/lib/api";

function renderPage() {
  return render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <HomePage />
    </SWRConfig>,
  );
}

const mockCreatePerson = jest.mocked(createPersonAction);
mockCreatePerson.mockResolvedValue(undefined);

const mockFetchPeople = jest.mocked(fetchPeople);
mockFetchPeople.mockResolvedValue([]);

const peopleFixture: Person[] = [
  {
    id: "a",
    name: "Bob",
    created_at: 1,
    updated_at: 2,
  },
  {
    id: "b",
    name: "Alice",
    created_at: 3,
    updated_at: 4,
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

describe("HomePage", () => {
  describe("when the page is loaded", () => {
    it("renders the server-side form, fetches people, and shows empty state", async () => {
      renderPage();

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /^submit$/i }),
      ).toBeInTheDocument();
      expect(await screen.findByText(/no people yet/i)).toBeInTheDocument();
      await waitFor(() => expect(mockFetchPeople).toHaveBeenCalled());
    });

    describe("when there are no people", () => {
      beforeEach(() => {
        mockFetchPeople.mockResolvedValue([]);
      });

      it("shows empty state", async () => {
        renderPage();

        expect(await screen.findByText(/no people yet/i)).toBeInTheDocument();
      });
    });

    describe("when there are people", () => {
      beforeEach(() => {
        mockFetchPeople.mockResolvedValue(peopleFixture);
      });

      it("lists people", async () => {
        renderPage();

        expect(await screen.findByText("Bob")).toBeInTheDocument();
        expect(await screen.findByText("Alice")).toBeInTheDocument();
      });
    });
  });

  describe("when the form is submitted successfully", () => {
    it("creates a person", async () => {
      const user = userEvent.setup();
      renderPage();
      const submittedName = "Ada";
      await user.type(screen.getByLabelText(/name/i), submittedName);
      await user.click(screen.getByRole("button", { name: /^submit$/i }));
      const requestedName = mockCreatePerson.mock.calls[0][0]?.get("name");
      await waitFor(() => expect(requestedName).toEqual(submittedName));
    });
  });
});
