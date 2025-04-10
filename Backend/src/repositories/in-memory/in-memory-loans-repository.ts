import { randomUUID } from "node:crypto";
import type { Loan, Prisma } from "@prisma/client";
import type { ILoansRepository } from "../loans-repository";

export class InMemoryLoansRepository implements ILoansRepository {
	public loans: Loan[] = [];

	async findById(id: string): Promise<Loan | null> {
		const loan = this.loans.find((loan) => loan.id === id);

		return loan ?? null;
	}

	async findManyByUserId(userId: string): Promise<Loan[]> {
		return this.loans.filter((loan) => loan.user_id === userId);
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
			return_date: null,
			status: status || "active",
		} as Loan;

		this.loans.push(loan);

		return loan;
	}

	async updateStatus(
		id: string,
		status: string,
		returnDate?: Date,
	): Promise<Loan | null> {
		const loanIndex = this.loans.findIndex((loan) => loan.id === id);

		if (loanIndex === -1) {
			return null;
		}

		const loan = this.loans[loanIndex];

		const updatedLoan: Loan = {
			...loan,
			status,
			return_date: returnDate ?? loan.return_date,
		};

		this.loans[loanIndex] = updatedLoan;

		return updatedLoan;
	}

	async countActiveLoansFromUser(userId: string): Promise<number> {
		return this.loans.filter(
			(loan) => loan.user_id === userId && loan.status === "active",
		).length;
	}
}
