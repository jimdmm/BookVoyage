import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';
import type { FastifyInstance } from 'fastify';
import { create } from './create';
import { deleteBook } from './delete';
import { search } from './search';
import { update } from './update';

export async function booksRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT);

	app.post('/books', { onRequest: [verifyUserRole('ADMIN')] }, create);
	app.get('/books', search);
	app.put('/books/:bookId', { onRequest: [verifyUserRole('ADMIN')] }, update);
	app.delete(
		'/books/:bookId',
		{ onRequest: [verifyUserRole('ADMIN')] },
		deleteBook,
	);
}
