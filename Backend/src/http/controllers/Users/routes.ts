import type { FastifyInstance } from 'fastify';
import { register } from './register';
import { profile } from './profile';
import { authenticate } from './authenticate';
import { refresh } from './refresh';
import { verifyJWT } from '@/http/middlewares/verify-jwt';

export async function usersRoutes(app: FastifyInstance) {
	app.post('/users', register);

	app.post('/sessions', authenticate);
	app.patch('/sessions/refresh ', refresh);

	app.get('/users/profile', { onRequest: [verifyJWT] }, profile);
}
