import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare } from "bcrypt";
import { RegisterUseCase } from "./register";
import { describe, expect, it } from "vitest";

describe("Register Use Case", () => {
	it("should hashing user password upon registration", async () => {
		const usersRepository = new InMemoryUsersRepository();
		const sut = new RegisterUseCase(usersRepository);

		const { user } = await sut.execute({
			name: "John Doe",
			email: "JohnDoe@mail.com",
			password: "12345678",
		});

		const isPasswordCorrectlyHashed = await compare(
			"12345678",
			user.password_hash,
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});
});
