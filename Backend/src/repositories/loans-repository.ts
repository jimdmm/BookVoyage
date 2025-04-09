import type { Loan, Prisma } from "@prisma/client";

export interface ILoansRepository {
	findById(loanId: string): Promise<Loan | null>;
	findManyByUserId(userId: string, page: number): Promise<Loan[]>;
	create(data: Prisma.LoanUncheckedCreateInput): Promise<Loan>;
}
