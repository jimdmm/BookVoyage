import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateBookUseCase } from './create-book';

let booksRepository: InMemoryBooksRepository;
let sut: CreateBookUseCase;

describe('Create book Use Case', () => {
	beforeEach(() => {
		booksRepository = new InMemoryBooksRepository();
		sut = new CreateBookUseCase(booksRepository);
	});

	it('should be able to add a book', async () => {
		const addedBook = await sut.execute({
			title: 'Clean Code',
			author: 'Robert C. Martin',
			isbn: '9780132350884',
			publication_year: 2008,
			quantity_available: 5,
		});

		expect(addedBook.book.id).toEqual(expect.any(String));
	});
});
