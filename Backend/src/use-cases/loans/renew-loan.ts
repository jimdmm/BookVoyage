import type { ILoansRepository } from '@/repositories/loans-repository';
import type { Loan } from '@prisma/client';
import { LoanNotActiveError } from '../errors/loan-not-active-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface RenewLoanUseCaseRequest {
	loan_id: string;
}

interface RenewLoanUseCaseResponse {
	loan: Loan;
}

export class RenewLoanUseCase {
	constructor(private loansRepository: ILoansRepository) {}

	async execute({
		loan_id,
	}: RenewLoanUseCaseRequest): Promise<RenewLoanUseCaseResponse> {
		const loan = await this.loansRepository.findById(loan_id);

		if (!loan) {
			throw new ResourceNotFoundError();
		}

		if (loan.status !== 'active') {
			throw new LoanNotActiveError();
		}

		const updatedLoan = await this.loansRepository.updateStatus(
			loan_id,
			'renewed',
		);

		if (!updatedLoan) {
			throw new Error();
		}

		return {
			loan: updatedLoan,
		};
	}
}
