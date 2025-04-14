import { PrismaBooksRepository } from "@/repositories/prisma/prisma-books-repository";
import { PrismaLoansRepository } from "@/repositories/prisma/prisma-loans-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { LoanUseCase } from "../loans/loan";

export function makeLoanUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const booksRepository = new PrismaBooksRepository();
	const loansRepository = new PrismaLoansRepository();
	const createLoanUseCase = new LoanUseCase(
		loansRepository,
		booksRepository,
		usersRepository,
	);

	return createLoanUseCase;
}
