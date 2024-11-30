import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";

class Note {
  constructor(public data: string[] = ["Moonhalo"]) {}
}

const app = new Elysia()
  .use(swagger())
  .decorate("note", new Note())
  .get("/note", ({ note }) => note.data)
  .get("/", () => "Hello Elysia")
  .post("/hello", "Do you miss me?")
  .get("/context", ({ path }) => path)
  .get("/user/:id", ({ params: { id } }) => id, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post("/form", ({ body }) => body)
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
