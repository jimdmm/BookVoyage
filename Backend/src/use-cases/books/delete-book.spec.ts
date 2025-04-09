import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryBooksRepository } from "@/repositories/in-memory/in-memory-books-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { DeleteBookUseCase } from "./delete-book";

let booksRepository: InMemoryBooksRepository;
let sut: DeleteBookUseCase;

describe("Update book Use Case", () => {
	beforeEach(() => {
		booksRepository = new InMemoryBooksRepository();
		sut = new DeleteBookUseCase(booksRepository);
	});

	it("should be able to delete a book", async () => {
		const book = await booksRepository.create({
			title: "Clean Code",
			author: "Robert C. Martin",
			isbn: "9780132350884",
			publication_year: 2008,
			quantity_available: 5,
		});

		const wasBookDeleted = await sut.execute(book.id);

		expect(wasBookDeleted).toBe(true);
	});

	it("should throw an error if the book does not exist", async () => {
		await expect(() => sut.execute("non-existent-id")).rejects.toBeInstanceOf(
			ResourceNotFoundError,
		);
	});
});
