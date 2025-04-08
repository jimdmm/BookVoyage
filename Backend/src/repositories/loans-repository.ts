import type { Loan, Prisma } from "@prisma/client";

export interface ILoansRepository {
	findById(id: string): Promise<Loan | null>;
	create(data: Prisma.LoanCreateInput): Promise<Loan>;
}
