import { FastifyInstance } from "fastify";
import { usersRoutes } from "./controllers/Users/routes";
import { booksRoutes } from "./controllers/Book/routes";
import { loansRoutes } from "./controllers/Loan/routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes);
  app.register(booksRoutes);
  app.register(loansRoutes);
}