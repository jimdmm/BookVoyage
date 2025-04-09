import type { IBooksRepository } from "@/repositories/books-repository";
import type { Book } from "@prisma/client";

interface CreateBookUseCaseRequest {
	title: string;
	author: string;
	isbn: string;
	publication_year: number;
	quantity_available: number;
}

interface CreateBookUseCaseResponse {
	book: Book;
}

export class CreateBookUseCase {
	constructor(private booksRepository: IBooksRepository) {}

	async execute({
		title,
		author,
		isbn,
		publication_year,
		quantity_available,
	}: CreateBookUseCaseRequest): Promise<CreateBookUseCaseResponse> {
		const book = await this.booksRepository.create({
			title,
			author,
			isbn,
			publication_year,
			quantity_available,
		});

		return { book };
	}
}
