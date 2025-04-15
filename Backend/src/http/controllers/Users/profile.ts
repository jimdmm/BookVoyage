import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUsersProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Por enquanto vamos usar um ID fixo para teste
    // posteriormente você pode implementar autenticação e pegar o ID do token JWT 
    const userId = request.headers['user-id'] as string;

    if (!userId) {
      return reply.status(401).send({ message: 'Unauthorized.' });
    }

    const getUserProfile = makeGetUsersProfileUseCase();

    const { user } = await getUserProfile.execute({
      userId,
    });

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}