import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetUsersProfileUseCase } from '../users/get-users-profile';

export function makeGetUsersProfileUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const getUsersProfileUseCase = new GetUsersProfileUseCase(usersRepository);

	return getUsersProfileUseCase;
}
