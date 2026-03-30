

## file structure

types.ts
```ts
interface person {
    name: string,
    id: string,
    created_at: number,
    updated_at: number,
}
 ```
/backend
/database
/frontend

## frontend

 a NextJS project with a single page with a form to take a person's name.

## backend
a hono server with drizzle

- database
 - resourceful postgres

 pseudo-schema

Each domain should have it's own dockerfile.
at the root level make a docker-compose that allows http communication between FE and BE and between BE and DB.

implement jest tests for frontend and backend

Scenario: I want to submit a new person
WHEN: i load my webpage
AND: i enter a name and submit the form
THEN: i get a success message

Scenario: I want to get all the people
WHEN: i get all people
case 1
AND: there are people to get
THEN: i get all people
case 2
AND: there are not people to get
THEN: i get an empty list

I want a toplevel package.json with scripts to  init the docker first time docker setup, first time database initiatlize  and start each dev service and delete all create files/artifacts/containers/images