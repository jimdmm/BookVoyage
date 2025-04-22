import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository';
import { InMemoryLoansRepository } from '@/repositories/in-memory/in-memory-loans-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { LoanAlreadyReturnedError } from '../errors/loan-already-returned-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { ReturnLoanUseCase } from './return-loan';

let loansRepository: InMemoryLoansRepository;
let booksRepository: InMemoryBooksRepository;
let sut: ReturnLoanUseCase;

describe('Return Loan Use Case', () => {
	beforeEach(() => {
		loansRepository = new InMemoryLoansRepository();
		booksRepository = new InMemoryBooksRepository();
		sut = new ReturnLoanUseCase(loansRepository, booksRepository);
	});

	it('should be able to return a loaned book', async () => {
		const book = await booksRepository.create({
			title: 'Clean Code',
			author: 'Robert C. Martin',
			isbn: '9780132350884',
			publication_year: 2008,
			quantity_available: 4,
		});

		const loan = await loansRepository.create({
			user_id: 'user-01',
			book_id: book.id,
			status: 'active',
		});

		const { loan: returnedLoan } = await sut.execute({
			loan_id: loan.id,
		});

		expect(returnedLoan.status).toBe('returned');
		expect(returnedLoan.return_date).toBeInstanceOf(Date);

		const updatedBook = await booksRepository.findById(book.id);
		expect(updatedBook?.quantity_available).toBe(5);
	});

	it('should not be able to return a non-existent loan', async () => {
		await expect(() =>
			sut.execute({
				loan_id: 'non-existent-loan-id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to return an already returned book', async () => {
		const book = await booksRepository.create({
			title: 'Clean Code',
			author: 'Robert C. Martin',
			isbn: '9780132350884',
			publication_year: 2008,
			quantity_available: 5,
		});

		const loan = await loansRepository.create({
			user_id: 'user-01',
			book_id: book.id,
			status: 'active',
		});

		await sut.execute({
			loan_id: loan.id,
		});

		await expect(() =>
			sut.execute({
				loan_id: loan.id,
			}),
		).rejects.toBeInstanceOf(LoanAlreadyReturnedError);
	});

	it('should throw an error if the book of the loan is not found', async () => {
		const book = await booksRepository.create({
			title: 'Clean Code',
			author: 'Robert C. Martin',
			isbn: '9780132350884',
			publication_year: 2008,
			quantity_available: 5,
		});

		const loan = await loansRepository.create({
			user_id: 'user-01',
			book_id: book.id,
			status: 'active',
		});

		await booksRepository.delete(book.id);

		await expect(() =>
			sut.execute({
				loan_id: loan.id,
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
