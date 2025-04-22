import type { Book, Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import type { IBooksRepository } from '../books-repository';

export class PrismaBooksRepository implements IBooksRepository {
	async findById(id: string): Promise<Book | null> {
		const book = await prisma.book.findUnique({
			where: { id },
		});

		return book;
	}

	async create({
		title,
		author,
		isbn,
		publication_year,
		quantity_available,
	}: Prisma.BookCreateInput): Promise<Book> {
		const book = await prisma.book.create({
			data: {
				title,
				author,
				isbn,
				publication_year: publication_year,
				quantity_available: Number(quantity_available),
			},
		});

		return book;
	}

	async update(
		id: string,
		bookUpdateInput: Partial<Book>,
	): Promise<Book | null> {
		try {
			const book = await prisma.book.update({
				where: { id },
				data: {
					...bookUpdateInput,
					publication_year:
						bookUpdateInput.publication_year !== undefined
							? Number(bookUpdateInput.publication_year)
							: undefined,
					quantity_available:
						bookUpdateInput.quantity_available !== undefined
							? Number(bookUpdateInput.quantity_available)
							: undefined,
				},
			});

			return book;
		} catch (error) {
			return null;
		}
	}

	async delete(id: string): Promise<boolean> {
		try {
			await prisma.book.delete({
				where: { id },
			});
			return true;
		} catch (error) {
			return false;
		}
	}

	async searchMany(query: string, page: number): Promise<Book[]> {
		const books = await prisma.book.findMany({
			where: {
				OR: [
					{ title: { contains: query } },
					{ author: { contains: query } },
					{ isbn: { contains: query } },
				],
			},
			take: 10,
			skip: (page - 1) * 10,
		});

		return books;
	}
}
