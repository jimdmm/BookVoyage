import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteBookUseCase } from '@/use-cases/factories/make-delete-book-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function deleteBook(request: FastifyRequest, reply: FastifyReply) {
	const deleteBookParamsSchema = z.object({
		bookId: z.string().uuid(),
	});

	try {
		const { bookId } = deleteBookParamsSchema.parse(request.params);

		const deleteBookUseCase = makeDeleteBookUseCase();

		await deleteBookUseCase.execute(bookId);

		return reply.status(204).send();
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: err.message });
		}

		throw err;
	}
}
