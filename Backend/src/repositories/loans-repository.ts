import type { Loan, Prisma } from "@prisma/client";

export interface ILoansRepository {
	findById(loanId: string): Promise<Loan | null>;
	findManyByUserId(userId: string): Promise<Loan[]>;
	create(data: Prisma.LoanUncheckedCreateInput): Promise<Loan>;
	updateStatus(
		id: string,
		status: string,
		returnDate?: Date,
	): Promise<Loan | null>;
	countActiveLoansFromUser(userId: string): Promise<number>;
}
