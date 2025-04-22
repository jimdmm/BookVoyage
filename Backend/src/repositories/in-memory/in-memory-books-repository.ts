import { randomUUID } from 'node:crypto';
import type { Book, Prisma } from '@prisma/client';
import type { IBooksRepository } from '../books-repository';

export class InMemoryBooksRepository implements IBooksRepository {
	public books: Book[] = [];

	async findById(id: string): Promise<Book | null> {
		const book = this.books.find((book) => book.id === id);

		return book ?? null;
	}

	async create({
		title,
		author,
		isbn,
		publication_year,
		quantity_available,
	}: Prisma.BookCreateInput): Promise<Book> {
		const book = {
			id: randomUUID(),
			title: title,
			author: author,
			isbn: isbn,
			publication_year: publication_year,
			quantity_available: Number(quantity_available),
			created_at: new Date(),
		};

		this.books.push(book);

		return book;
	}

	async update(
		id: string,
		bookUpdateInput: Partial<Book>,
	): Promise<Book | null> {
		const bookIndex = this.books.findIndex((book) => book.id === id);

		if (bookIndex === -1) {
			return null;
		}

		const currentBook = this.books[bookIndex];

		const updatedBook: Book = {
			...currentBook,
			...bookUpdateInput,
			publication_year:
				bookUpdateInput.publication_year !== undefined
					? Number(bookUpdateInput.publication_year)
					: currentBook.publication_year,

			quantity_available:
				bookUpdateInput.quantity_available !== undefined
					? Number(bookUpdateInput.quantity_available)
					: currentBook.quantity_available,
		};

		this.books[bookIndex] = updatedBook;

		return updatedBook;
	}

	async delete(id: string): Promise<boolean> {
		const bookIndex = this.books.findIndex((book) => book.id === id);

		if (bookIndex === -1) {
			return false;
		}

		this.books.splice(bookIndex, 1);
		return true;
	}

	async searchMany(query: string, page: number): Promise<Book[]> {
		return this.books
			.filter(
				(book) =>
					book.title.includes(query) ||
					book.author.includes(query) ||
					book.isbn.includes(query),
			)
			.slice((page - 1) * 10, page * 10);
	}
}
