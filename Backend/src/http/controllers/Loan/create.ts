import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeLoanUseCase } from "@/use-cases/factories/make-loan-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { BookNotAvailableError } from "@/use-cases/errors/book-not-avaliable-error";
import { UserLoanLimitError } from "@/use-cases/errors/user-loan-limit-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createLoanBodySchema = z.object({
    user_id: z.string().uuid(),
    book_id: z.string().uuid(),
  });

  try {
    const { user_id, book_id } = createLoanBodySchema.parse(request.body);

    const loanUseCase = makeLoanUseCase();

    const { loan } = await loanUseCase.execute({
      user_id,
      book_id,
    });

    return reply.status(201).send({ loan });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof BookNotAvailableError) {
      return reply.status(400).send({ message: err.message });
    }

    if (err instanceof UserLoanLimitError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}