import { createPersonAction } from "@/app/actions";

export function PeopleForm() {
  return (
    <section aria-labelledby="add-heading">
      <h2 id="add-heading" className="sr-only">
        Add a person
      </h2>
      <form action={createPersonAction}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
