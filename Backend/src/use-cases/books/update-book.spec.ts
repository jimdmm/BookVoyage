import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UpdateBookUseCase } from './update-book';

let booksRepository: InMemoryBooksRepository;
let sut: UpdateBookUseCase;

describe('Update book Use Case', () => {
	beforeEach(() => {
		booksRepository = new InMemoryBooksRepository();
		sut = new UpdateBookUseCase(booksRepository);
	});

	it('should be able to update a book', async () => {
		const book = await booksRepository.create({
			title: 'Clean Code',
			author: 'Robert C. Martin',
			isbn: '9780132350884',
			publication_year: 2008,
			quantity_available: 5,
		});

		const updatedBook = await sut.execute({
			id: book.id,
			bookUpdateInput: {
				title: 'Clean Code (Updated)',
				quantity_available: 7,
			},
		});

		expect(updatedBook.book.title).toBe('Clean Code (Updated)');
		expect(updatedBook.book.quantity_available).toBe(7);
	});

	it('should throw an error if the book does not exist', async () => {
		await expect(() =>
			sut.execute({
				id: 'non-existent-id',
				bookUpdateInput: {
					title: 'Non-existent Book',
				},
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
