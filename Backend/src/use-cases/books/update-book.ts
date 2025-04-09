import type { IBooksRepository } from "@/repositories/books-repository";
import type { Book } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateBookUseCaseRequest {
	id: string;
	bookUpdateInput: Partial<Book>;
}

interface UpdateBookUseCaseResponse {
	book: Book;
}

export class UpdateBookUseCase {
	constructor(private booksRepository: IBooksRepository) {}

	async execute({
		id,
		bookUpdateInput,
	}: UpdateBookUseCaseRequest): Promise<UpdateBookUseCaseResponse> {
		const book = await this.booksRepository.update(id, bookUpdateInput);

		if (!book) {
			throw new ResourceNotFoundError();
		}

		return { book };
	}
}
