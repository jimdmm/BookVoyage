import type { Loan, Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import type { ILoansRepository } from '../loans-repository';

export class PrismaLoansRepository implements ILoansRepository {
	async findById(id: string): Promise<Loan | null> {
		const loan = await prisma.loan.findUnique({
			where: { id },
		});

		return loan;
	}

	async findManyByUserId(userId: string): Promise<Loan[]> {
		return await prisma.loan.findMany({
			where: { user_id: userId },
		});
	}

	async create({
		user_id,
		book_id,
		status,
	}: Prisma.LoanUncheckedCreateInput): Promise<Loan> {
		const loanDate = new Date();
		const returnDate = new Date(loanDate);
		returnDate.setDate(loanDate.getDate() + 14);

		const loan = await prisma.loan.create({
			data: {
				user_id,
				book_id,
				loan_date: loanDate,
				status: status || 'active',
			},
		});

		return loan;
	}

	async updateStatus(
		id: string,
		status: string,
		returnDate?: Date,
	): Promise<Loan | null> {
		return await prisma.loan.update({
			where: { id },
			data: {
				status,
				...(returnDate && { return_date: returnDate }),
			},
		});
	}
}
