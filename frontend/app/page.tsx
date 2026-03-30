import { PeopleForm } from "@/app/people-form";
import { PeopleList } from "@/app/people-list";

export default function HomePage() {
  return (
    <main>
      <h1>People</h1>
      <PeopleForm />
      <PeopleList />
    </main>
  );
}
