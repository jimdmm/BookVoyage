import { randomUUID } from "node:crypto";
import type { Prisma, User } from "@prisma/client";
import type { IUsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements IUsersRepository {
	public users: User[] = [];

	async findById(id: string): Promise<User | null> {
		const createdUser = this.users.find((user) => user.id === id);

		if (!createdUser) return null;

		return createdUser;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.users.find((user) => user.email === email);

		if (!user) return null;

		return user;
	}

	async create({
		name,
		email,
		password_hash,
	}: Prisma.UserCreateInput): Promise<User> {
		const user = {
			id: randomUUID(),
			name: name,
			email: email,
			password_hash: password_hash,
			created_at: new Date(),
		};

		this.users.push(user);

		return user;
	}
}
