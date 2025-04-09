import { randomUUID } from "node:crypto";
import type { Loan, Prisma } from "@prisma/client";
import type { ILoansRepository } from "../loans-repository";

export class InMemoryLoansRepository implements ILoansRepository {
	public loans: Loan[] = [];

	async findById(id: string): Promise<Loan | null> {
		const loan = this.loans.find((loan) => loan.id === id);

		return loan ?? null;
	}

	async findManyByUserId(userId: string, page: number): Promise<Loan[]> {
		return this.loans
			.filter((loan) => loan.user_id === userId)
			.slice((page - 1) * 10, page * 10);
	}

	async create({
		user_id,
		book_id,
		status,
	}: Prisma.LoanUncheckedCreateInput): Promise<Loan> {
		const loanDate = new Date();
		const returnDate = new Date(loanDate);
		returnDate.setDate(loanDate.getDate() + 14);

		const loan = {
			id: randomUUID(),
			user_id: user_id,
			book_id: book_id,
			loan_date: loanDate,
			return_date: returnDate,
			status,
		} as Loan;

		this.loans.push(loan);

		return loan;
	}
}
