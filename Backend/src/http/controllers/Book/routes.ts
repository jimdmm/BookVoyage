import { FastifyInstance } from "fastify";
import { create } from "./create";
import { search } from "./search";
import { update } from "./update";
import { deleteBook } from "./delete";

export async function booksRoutes(app: FastifyInstance) {
  app.post("/books", create);
  app.get("/books", search);
  app.put("/books/:bookId", update);
  app.delete("/books/:bookId", deleteBook);
}