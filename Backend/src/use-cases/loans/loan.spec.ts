import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository';
import { InMemoryLoansRepository } from '@/repositories/in-memory/in-memory-loans-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { BookNotAvailableError } from '../errors/book-not-avaliable-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UserLoanLimitError } from '../errors/user-loan-limit-error';
import { LoanUseCase } from './loan';

let loansRepository: InMemoryLoansRepository;
let booksRepository: InMemoryBooksRepository;
let usersRepository: InMemoryUsersRepository;
let sut: LoanUseCase;

describe('Loan Use Case', () => {
	beforeEach(() => {
		loansRepository = new InMemoryLoansRepository();
		booksRepository = new InMemoryBooksRepository();
		usersRepository = new InMemoryUsersRepository();
		sut = new LoanUseCase(loansRepository, booksRepository, usersRepository);
	});

	it('should be able to loan a book', async () => {
		const user = await usersRepository.create({
			name: 'John Doe',
			email: 'john@example.com',
			password_hash: '123456',
		});

		const book = await booksRepository.create({
			title: 'Clean Code',
			author: 'Robert C. Martin',
			isbn: '9780132350884',
			publication_year: 2008,
			quantity_available: 5,
		});

		const { loan } = await sut.execute({
			user_id: user.id,
			book_id: book.id,
		});

		expect(loan.id).toEqual(expect.any(String));
		expect(loan.user_id).toEqual(user.id);
		expect(loan.book_id).toEqual(book.id);
		expect(loan.status).toEqual('active');

		const updatedBook = await booksRepository.findById(book.id);
		expect(updatedBook?.quantity_available).toBe(4);
	});

	it('should not be able to loan a book with non-existent user id', async () => {
		const book = await booksRepository.create({
			title: 'Clean Code',
			author: 'Robert C. Martin',
			isbn: '9780132350884',
			publication_year: 2008,
			quantity_available: 5,
		});

		await expect(() =>
			sut.execute({
				user_id: 'non-existent-user-id',
				book_id: book.id,
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to loan a book with non-existent book id', async () => {
		const user = await usersRepository.create({
			name: 'John Doe',
			email: 'john@example.com',
			password_hash: '123456',
		});

		await expect(() =>
			sut.execute({
				user_id: user.id,
				book_id: 'non-existent-book-id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to loan a book with no available copies', async () => {
		const user = await usersRepository.create({
			name: 'John Doe',
			email: 'john@example.com',
			password_hash: '123456',
		});

		const book = await booksRepository.create({
			title: 'Clean Code',
			author: 'Robert C. Martin',
			isbn: '9780132350884',
			publication_year: 2008,
			quantity_available: 0,
		});

		await expect(() =>
			sut.execute({
				user_id: user.id,
				book_id: book.id,
			}),
		).rejects.toBeInstanceOf(BookNotAvailableError);
	});

	it('should not be able to loan more than 2 books at a time', async () => {
		const user = await usersRepository.create({
			name: 'John Doe',
			email: 'john@example.com',
			password_hash: '123456',
		});

		const book1 = await booksRepository.create({
			title: 'Clean Code',
			author: 'Robert C. Martin',
			isbn: '9780132350884',
			publication_year: 2008,
			quantity_available: 5,
		});

		const book2 = await booksRepository.create({
			title: 'Refactoring',
			author: 'Martin Fowler',
			isbn: '9780201485677',
			publication_year: 1999,
			quantity_available: 3,
		});

		const book3 = await booksRepository.create({
			title: 'Domain-Driven Design',
			author: 'Eric Evans',
			isbn: '9780321125217',
			publication_year: 2003,
			quantity_available: 2,
		});

		await sut.execute({
			user_id: user.id,
			book_id: book1.id,
		});

		await sut.execute({
			user_id: user.id,
			book_id: book2.id,
		});

		await expect(() =>
			sut.execute({
				user_id: user.id,
				book_id: book3.id,
			}),
		).rejects.toBeInstanceOf(UserLoanLimitError);
	});
});
