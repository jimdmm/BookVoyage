import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeListUserLoansUseCase } from "@/use-cases/factories/make-list-user-loans-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export async function listUserLoans(request: FastifyRequest, reply: FastifyReply) {
  const listUserLoansParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const listUserLoansQuerySchema = z.object({
    page: z.string().transform(Number).default("1"),
  });

  try {
    const { userId } = listUserLoansParamsSchema.parse(request.params);
    const { page } = listUserLoansQuerySchema.parse(request.query);

    const listUserLoansUseCase = makeListUserLoansUseCase();

    const { loans } = await listUserLoansUseCase.execute({
      user_id: userId,
      page,
    });

    return reply.status(200).send({ loans });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}