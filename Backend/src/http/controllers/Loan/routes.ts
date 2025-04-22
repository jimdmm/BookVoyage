import { FastifyInstance } from "fastify";
import { create } from "./create";
import { renew } from "./renew";
import { returnLoan } from "./return";
import { listUserLoans } from "./list";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function loansRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  
  app.post("/loans", create);
  app.patch("/loans/:loanId/renew", renew);
  app.patch("/loans/:loanId/return", returnLoan);
  app.get("/users/:userId/loans", listUserLoans);
}