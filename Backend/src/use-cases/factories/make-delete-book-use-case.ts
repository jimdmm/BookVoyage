import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository';
import { DeleteBookUseCase } from '../books/delete-book';

export function makeDeleteBookUseCase() {
	const bookRepository = new PrismaBooksRepository();
	const deleteBookUseCase = new DeleteBookUseCase(bookRepository);

	return deleteBookUseCase;
}
