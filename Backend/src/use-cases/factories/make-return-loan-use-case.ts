import { PrismaLoansRepository } from "@/repositories/prisma/prisma-loans-repository";
import { PrismaBooksRepository } from "@/repositories/prisma/prisma-books-repository";
import { ReturnLoanUseCase } from "../loans/return-loan";

export function makeReturnLoanUseCase() {
	const loansRepository = new PrismaLoansRepository();
	const booksRepository = new PrismaBooksRepository();
	const returnLoanUseCase = new ReturnLoanUseCase(
		loansRepository,
		booksRepository,
	);

	return returnLoanUseCase;
}
