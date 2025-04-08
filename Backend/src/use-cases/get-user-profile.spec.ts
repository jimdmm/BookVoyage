import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUsersProfileUseCase } from "./get-user-profile";
import bcrypt from "bcrypt";

let usersRepository: InMemoryUsersRepository;
let sut: GetUsersProfileUseCase;

describe("Get user profile Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new GetUsersProfileUseCase(usersRepository);
	});

	it("should be able to get user profile", async () => {
		const createdUser = await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password_hash: await bcrypt.hash("12345678", 6),
		});

		const { user } = await sut.execute({
			userId: createdUser.id,
		});

		expect(user.name).toEqual("John Doe");
	});

	it("should not be able to get user profile with wrong id", async () => {
		await expect(() =>
			sut.execute({
				userId: "non-existing-id",
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
