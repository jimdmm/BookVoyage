import { InMemoryBooksRepository } from "@/repositories/in-memory/in-memory-books-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { SearchBooksUseCase } from "./search-books";

let booksRepository: InMemoryBooksRepository;
let sut: SearchBooksUseCase;

describe("Search Books Use Case", () => {
	beforeEach(async () => {
		booksRepository = new InMemoryBooksRepository();
		sut = new SearchBooksUseCase(booksRepository);
	});

	it("should be able to search for books by title", async () => {
		await booksRepository.create({
			title: "Clean Code",
			author: "Robert C. Martin",
			isbn: "9780132350884",
			publication_year: 2008,
			quantity_available: 5,
		});

		await booksRepository.create({
			title: "The Pragmatic Programmer",
			author: "Andrew Hunt and David Thomas",
			isbn: "9780201616224",
			publication_year: 1999,
			quantity_available: 3,
		});

		const { books } = await sut.execute({
			query: "Clean",
			page: 1,
		});

		expect(books).toHaveLength(1);
		expect(books).toEqual([expect.objectContaining({ title: "Clean Code" })]);
	});

	it("should be able to search for books by author", async () => {
		await booksRepository.create({
			title: "Clean Code",
			author: "Robert C. Martin",
			isbn: "9780132350884",
			publication_year: 2008,
			quantity_available: 5,
		});

		await booksRepository.create({
			title: "The Pragmatic Programmer",
			author: "Andrew Hunt and David Thomas",
			isbn: "9780201616224",
			publication_year: 1999,
			quantity_available: 3,
		});

		const { books } = await sut.execute({
			query: "Robert",
			page: 1,
		});

		expect(books).toHaveLength(1);
		expect(books).toEqual([
			expect.objectContaining({ author: "Robert C. Martin" }),
		]);
	});

	it("should be able to fetch paginated books search", async () => {
		for (let i = 1; i <= 12; i++) {
			await booksRepository.create({
				title: `JavaScript ${i}`,
				author: "Robert C. Martin",
				isbn: "9780132350884",
				publication_year: 2008,
				quantity_available: 5,
			});
		}

		const { books } = await sut.execute({
			query: "JavaScript",
			page: 2,
		});

		expect(books).toHaveLength(2);
		expect(books).toEqual([
			expect.objectContaining({ title: "JavaScript 11" }),
			expect.objectContaining({ title: "JavaScript 12" }),
		]);
	});
});
