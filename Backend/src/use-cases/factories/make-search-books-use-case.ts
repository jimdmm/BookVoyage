import { PrismaBooksRepository } from "@/repositories/prisma/prisma-books-repository";
import { SearchBooksUseCase } from "../books/search-books";

export function makeSearchBooksUseCase() {
	const booksRepository = new PrismaBooksRepository();
	const searchBooksUseCase = new SearchBooksUseCase(booksRepository);

	return searchBooksUseCase;
}
