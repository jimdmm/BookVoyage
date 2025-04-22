import type { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateBookUseCase } from '@/use-cases/factories/make-create-book-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createBookBodySchema = z.object({
		title: z.string(),
		author: z.string(),
		isbn: z.string(),
		publication_year: z.number().int().positive(),
		quantity_available: z.number().int().nonnegative(),
	});

	try {
		const { title, author, isbn, publication_year, quantity_available } =
			createBookBodySchema.parse(request.body);

		const createBookUseCase = makeCreateBookUseCase();

		const { book } = await createBookUseCase.execute({
			title,
			author,
			isbn,
			publication_year,
			quantity_available,
		});

		return reply.status(201).send({ book });
	} catch (err) {
		throw err as Error;
	}
}
