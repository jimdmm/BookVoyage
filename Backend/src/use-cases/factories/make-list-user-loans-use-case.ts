import { PrismaLoansRepository } from "@/repositories/prisma/prisma-loans-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ListUserLoansUseCase } from "../loans/list-user-loans";

export function makeListUserLoansUseCase() {
	const loansRepository = new PrismaLoansRepository();
	const usersRepository = new PrismaUsersRepository();
	const listUserLoansUseCase = new ListUserLoansUseCase(
		loansRepository,
		usersRepository,
	);

	return listUserLoansUseCase;
}
