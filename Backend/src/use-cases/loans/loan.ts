import type { IBooksRepository } from '@/repositories/books-repository';
import type { ILoansRepository } from '@/repositories/loans-repository';
import type { IUsersRepository } from '@/repositories/users-repository';
import type { Loan } from '@prisma/client';
import { BookNotAvailableError } from '../errors/book-not-avaliable-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UserLoanLimitError } from '../errors/user-loan-limit-error';

interface LoanUseCaseRequest {
	user_id: string;
	book_id: string;
}

interface LoanUseCaseResponse {
	loan: Loan;
}

export class LoanUseCase {
	public constructor(
		private loansRepository: ILoansRepository,
		private booksRepository: IBooksRepository,
		private usersRepository: IUsersRepository,
	) {}

	public async execute({
		user_id,
		book_id,
	}: LoanUseCaseRequest): Promise<LoanUseCaseResponse> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		const book = await this.booksRepository.findById(book_id);

		if (!book) {
			throw new ResourceNotFoundError();
		}

		if (book.quantity_available === 0) {
			throw new BookNotAvailableError();
		}

		const userLoans = await this.loansRepository.findManyByUserId(user_id);
		const activeLoans = userLoans.filter((loan) => loan.status === 'active');

		if (activeLoans.length >= 2) {
			throw new UserLoanLimitError();
		}

		const loan = await this.loansRepository.create({
			user_id,
			book_id,
			status: 'active',
		});

		await this.booksRepository.update(book_id, {
			quantity_available: book.quantity_available - 1,
		});

		return {
			loan,
		};
	}
}
