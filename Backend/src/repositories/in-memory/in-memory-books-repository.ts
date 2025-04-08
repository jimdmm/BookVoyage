import { randomUUID } from "node:crypto";
import type { Book, Prisma } from "@prisma/client";
import type { IBooksRepository } from "../books-repository";

export class InMemoryBooksRepository implements IBooksRepository {
	public books: Book[] = [];

	async create({
		id,
		title,
		author,
		isbn,
		publication_year,
		quantity_available,
	}: Prisma.BookCreateInput): Promise<Book> {
		const book = {
			id: id ?? randomUUID(),
			title: title,
			author: author,
			isbn: isbn,
			publication_year: Number(publication_year),
			quantity_available: Number(quantity_available),
			created_at: new Date(),
		};

		this.books.push(book);

		return book;
	}

	async searchMany(query: string, page: number): Promise<Book[]> {
		return this.books
			.filter((book) => book.title.includes(query))
			.slice((page - 1) * 20, page * 20);
	}
}
