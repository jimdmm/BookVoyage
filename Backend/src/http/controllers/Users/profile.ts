import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetUsersProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
	try {
		const getUserProfile = makeGetUsersProfileUseCase();

		const { user } = await getUserProfile.execute({
			userId: request.user.sub,
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
