import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { compare } from 'bcrypt';
import { beforeEach, describe, expect, it } from 'vitest';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { RegisterUseCase } from './register';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new RegisterUseCase(usersRepository);
	});

	it('should hashing user password upon registration', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'JohnDoe@mail.com',
			password: '12345678',
		});

		const isPasswordCorrectlyHashed = await compare(
			'12345678',
			user.password_hash,
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it('should not be able to register a user with the same email twice', async () => {
		const email = 'JohnDoe@mail.com';

		await sut.execute({
			name: 'John Doe',
			email,
			password: '12345678',
		});

		await expect(() =>
			sut.execute({
				name: 'Another User',
				email,
				password: '87654321',
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});
