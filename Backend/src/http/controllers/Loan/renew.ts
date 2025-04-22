import { LoanNotActiveError } from '@/use-cases/errors/loan-not-active-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeRenewLoanUseCase } from '@/use-cases/factories/make-renew-loan-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function renew(request: FastifyRequest, reply: FastifyReply) {
	const renewLoanParamsSchema = z.object({
		loanId: z.string().uuid(),
	});

	try {
		const { loanId } = renewLoanParamsSchema.parse(request.params);

		const renewLoanUseCase = makeRenewLoanUseCase();

		const { loan } = await renewLoanUseCase.execute({
			loan_id: loanId,
		});

		return reply.status(200).send({ loan });
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: err.message });
		}

		if (err instanceof LoanNotActiveError) {
			return reply.status(400).send({ message: err.message });
		}

		throw err;
	}
}
