import { PrismaBooksRepository } from "@/repositories/prisma/prisma-books-repository";
import { CreateBookUseCase } from "../books/create-book";

export function makeCreateBookUseCase() {
	const bookRepository = new PrismaBooksRepository();
	const createBookUseCase = new CreateBookUseCase(bookRepository);

	return createBookUseCase;
}
