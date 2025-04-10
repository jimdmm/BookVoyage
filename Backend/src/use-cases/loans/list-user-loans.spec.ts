import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryLoansRepository } from "@/repositories/in-memory/in-memory-loans-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ListUserLoansUseCase } from "./list-user-loans";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let loansRepository: InMemoryLoansRepository;
let usersRepository: InMemoryUsersRepository;
let sut: ListUserLoansUseCase;

describe("List User Loans Use Case", () => {
	beforeEach(() => {
		loansRepository = new InMemoryLoansRepository();
		usersRepository = new InMemoryUsersRepository();
		sut = new ListUserLoansUseCase(loansRepository, usersRepository);
	});

	it("should be able to list user loans", async () => {
		const user = await usersRepository.create({
			name: "John Doe",
			email: "john@example.com",
			password_hash: "123456",
		});

		await loansRepository.create({
			user_id: user.id,
			book_id: "book-01",
			status: "active",
		});

		await loansRepository.create({
			user_id: user.id,
			book_id: "book-02",
			status: "returned",
		});

		await loansRepository.create({
			user_id: "other-user",
			book_id: "book-03",
			status: "active",
		});

		const { loans } = await sut.execute({
			user_id: user.id,
			page: 1,
		});

		expect(loans).toHaveLength(2);
		expect(loans).toEqual([
			expect.objectContaining({ user_id: user.id, book_id: "book-01" }),
			expect.objectContaining({ user_id: user.id, book_id: "book-02" }),
		]);
	});

	it("should return an empty array when the user has no loans", async () => {
		const user = await usersRepository.create({
			name: "John Doe",
			email: "john@example.com",
			password_hash: "123456",
		});

		const { loans } = await sut.execute({
			user_id: user.id,
			page: 1,
		});

		expect(loans).toEqual([]);
	});

	it("should not be able to list loans with a non-existent user id", async () => {
		await expect(() =>
			sut.execute({
				user_id: "non-existent-user-id",
				page: 1,
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
