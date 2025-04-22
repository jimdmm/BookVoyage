import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeUpdateBookUseCase } from '@/use-cases/factories/make-update-book-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updateBookParamsSchema = z.object({
		bookId: z.string().uuid(),
	});

	const updateBookBodySchema = z.object({
		title: z.string().optional(),
		author: z.string().optional(),
		isbn: z.string().optional(),
		publication_year: z.number().int().positive().optional(),
		quantity_available: z.number().int().nonnegative().optional(),
	});

	try {
		const { bookId } = updateBookParamsSchema.parse(request.params);
		const bookUpdateInput = updateBookBodySchema.parse(request.body);

		const updateBookUseCase = makeUpdateBookUseCase();

		const { book } = await updateBookUseCase.execute({
			id: bookId,
			bookUpdateInput,
		});

		return reply.status(200).send({ book });
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: err.message });
		}

		throw err;
	}
}
