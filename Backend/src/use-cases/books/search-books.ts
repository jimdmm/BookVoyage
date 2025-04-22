import type { IBooksRepository } from '@/repositories/books-repository';
import type { Book } from '@prisma/client';

interface SearchBooksUseCaseRequest {
	query: string;
	page: number;
}

interface SearchBooksUseCaseResponse {
	books: Book[];
}
export class SearchBooksUseCase {
	constructor(private booksRepository: IBooksRepository) {}

	async execute({
		query,
		page,
	}: SearchBooksUseCaseRequest): Promise<SearchBooksUseCaseResponse> {
		const books = await this.booksRepository.searchMany(query, page);

		return { books };
	}
}
