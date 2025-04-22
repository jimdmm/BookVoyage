import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import bcrypt from 'bcrypt';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { GetUsersProfileUseCase } from './get-users-profile';

let usersRepository: InMemoryUsersRepository;
let sut: GetUsersProfileUseCase;

describe('Get users profile Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new GetUsersProfileUseCase(usersRepository);
	});

	it('should be able to get user profile', async () => {
		const createdUser = await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await bcrypt.hash('12345678', 6),
		});

		const { user } = await sut.execute({
			userId: createdUser.id,
		});

		expect(user.name).toEqual('John Doe');
	});

	it('should not be able to get user profile with wrong id', async () => {
		await expect(() =>
			sut.execute({
				userId: 'non-existing-id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
