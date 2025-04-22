import type { IBooksRepository } from '@/repositories/books-repository';
import type { ILoansRepository } from '@/repositories/loans-repository';
import type { Loan } from '@prisma/client';
import { LoanAlreadyReturnedError } from '../errors/loan-already-returned-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface ReturnLoanUseCaseRequest {
	loan_id: string;
}

interface ReturnLoanUseCaseResponse {
	loan: Loan;
}

export class ReturnLoanUseCase {
	constructor(
		private loansRepository: ILoansRepository,
		private booksRepository: IBooksRepository,
	) {}

	async execute({
		loan_id,
	}: ReturnLoanUseCaseRequest): Promise<ReturnLoanUseCaseResponse> {
		const loan = await this.loansRepository.findById(loan_id);

		if (!loan) {
			throw new ResourceNotFoundError();
		}

		if (loan.status === 'returned') {
			throw new LoanAlreadyReturnedError();
		}

		const book = await this.booksRepository.findById(loan.book_id);
		if (!book) {
			throw new ResourceNotFoundError();
		}

		const returnDate = new Date();
		const updatedLoan = await this.loansRepository.updateStatus(
			loan_id,
			'returned',
			returnDate,
		);

		if (!updatedLoan) {
			throw new Error('Falha ao atualizar o status do empréstimo');
		}

		await this.booksRepository.update(loan.book_id, {
			quantity_available: book.quantity_available + 1,
		});

		return {
			loan: updatedLoan,
		};
	}
}
