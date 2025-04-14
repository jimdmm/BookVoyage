import type { Prisma, User } from "@prisma/client";
import type { IUsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements IUsersRepository {
	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}

	async create({
		name,
		email,
		password_hash,
	}: Prisma.UserCreateInput): Promise<User> {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password_hash,
			},
		});

		return user;
	}
}
