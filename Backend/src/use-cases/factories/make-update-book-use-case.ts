import { PrismaBooksRepository } from "@/repositories/prisma/prisma-books-repository";
import { UpdateBookUseCase } from "../books/update-book";

export function makeUpdateBookUseCase() {
	const booksRepository = new PrismaBooksRepository();
	const updateBookUseCase = new UpdateBookUseCase(booksRepository);

	return updateBookUseCase;
}
