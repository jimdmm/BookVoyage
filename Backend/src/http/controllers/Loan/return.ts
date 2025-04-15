import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeReturnLoanUseCase } from "@/use-cases/factories/make-return-loan-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { LoanAlreadyReturnedError } from "@/use-cases/errors/loan-already-returned-error";

export async function returnLoan(request: FastifyRequest, reply: FastifyReply) {
  const returnLoanParamsSchema = z.object({
    loanId: z.string().uuid(),
  });

  try {
    const { loanId } = returnLoanParamsSchema.parse(request.params);

    const returnLoanUseCase = makeReturnLoanUseCase();

    const { loan } = await returnLoanUseCase.execute({
      loan_id: loanId,
    });

    return reply.status(200).send({ loan });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof LoanAlreadyReturnedError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}