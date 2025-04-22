import type { ILoansRepository } from '@/repositories/loans-repository';
import type { IUsersRepository } from '@/repositories/users-repository';
import type { Loan } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface ListUserLoansUseCaseRequest {
	user_id: string;
	page: number;
}

interface ListUserLoansUseCaseResponse {
	loans: Loan[];
}

export class ListUserLoansUseCase {
	constructor(
		private loansRepository: ILoansRepository,
		private usersRepository: IUsersRepository,
	) {}

	async execute({
		user_id,
	}: ListUserLoansUseCaseRequest): Promise<ListUserLoansUseCaseResponse> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		const loans = await this.loansRepository.findManyByUserId(user_id);

		return {
			loans,
		};
	}
}
