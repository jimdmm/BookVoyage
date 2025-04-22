import type { FastifyInstance } from 'fastify';
import { booksRoutes } from './controllers/Book/routes';
import { loansRoutes } from './controllers/Loan/routes';
import { usersRoutes } from './controllers/Users/routes';

export async function appRoutes(app: FastifyInstance) {
	app.register(usersRoutes);
	app.register(booksRoutes);
	app.register(loansRoutes);
}
