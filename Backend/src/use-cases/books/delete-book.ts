import type { IBooksRepository } from '@/repositories/books-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

export class DeleteBookUseCase {
	constructor(private booksRepository: IBooksRepository) {}

	async execute(id: string): Promise<boolean> {
		const wasDeleted = await this.booksRepository.delete(id);

		if (!wasDeleted) {
			throw new ResourceNotFoundError();
		}

		return true;
	}
}
