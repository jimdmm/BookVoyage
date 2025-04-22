import { verifyJWT } from '@/http/middlewares/verify-jwt';
import type { FastifyInstance } from 'fastify';
import { create } from './create';
import { listUserLoans } from './list';
import { renew } from './renew';
import { returnLoan } from './return';

export async function loansRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT);

	app.post('/loans', create);
	app.patch('/loans/:loanId/renew', renew);
	app.patch('/loans/:loanId/return', returnLoan);
	app.get('/users/:userId/loans', listUserLoans);
}
