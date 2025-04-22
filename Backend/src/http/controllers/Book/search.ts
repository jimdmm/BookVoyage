import { makeSearchBooksUseCase } from '@/use-cases/factories/make-search-books-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function search(request: FastifyRequest, reply: FastifyReply) {
	const searchBooksQuerySchema = z.object({
		query: z.string(),
		page: z.string().transform(Number).default('1'),
	});

	const { query, page } = searchBooksQuerySchema.parse(request.query);

	const searchBooksUseCase = makeSearchBooksUseCase();

	const { books } = await searchBooksUseCase.execute({
		query,
		page,
	});

	return reply.status(200).send({ books });
}
