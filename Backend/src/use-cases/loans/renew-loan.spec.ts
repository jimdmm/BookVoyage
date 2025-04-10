import { expect, describe, it, beforeEach, vi } from "vitest";
import { InMemoryLoansRepository } from "@/repositories/in-memory/in-memory-loans-repository";
import { RenewLoanUseCase } from "./renew-loan";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { LoanNotActiveError } from "../errors/loan-not-active-error";

let loansRepository: InMemoryLoansRepository;
let sut: RenewLoanUseCase;

describe("Renew Loan Use Case", () => {
	beforeEach(() => {
		loansRepository = new InMemoryLoansRepository();
		sut = new RenewLoanUseCase(loansRepository);
	});

	it("should be able to renew an active loan", async () => {
		const loan = await loansRepository.create({
			user_id: "user-01",
			book_id: "book-01",
			status: "active",
		});

		const { loan: renewedLoan } = await sut.execute({
			loan_id: loan.id,
		});

		expect(renewedLoan.status).toBe("renewed");
	});

	it("should not be able to renew a non-existent loan", async () => {
		await expect(() =>
			sut.execute({
				loan_id: "non-existent-loan-id",
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to renew a returned loan", async () => {
		const loan = await loansRepository.create({
			user_id: "user-01",
			book_id: "book-01",
			status: "returned",
		});

		await expect(() =>
			sut.execute({
				loan_id: loan.id,
			}),
		).rejects.toBeInstanceOf(LoanNotActiveError);
	});

	it("should not be able to renew an already renewed loan", async () => {
		const loan = await loansRepository.create({
			user_id: "user-01",
			book_id: "book-01",
			status: "renewed",
		});

		await expect(() =>
			sut.execute({
				loan_id: loan.id,
			}),
		).rejects.toBeInstanceOf(LoanNotActiveError);
	});

	it("should throw an error if the repository update fails", async () => {
		const loan = await loansRepository.create({
			user_id: "user-01",
			book_id: "book-01",
			status: "active",
		});

		vi.spyOn(loansRepository, "updateStatus").mockImplementationOnce(
			async () => null,
		);

		await expect(() =>
			sut.execute({
				loan_id: loan.id,
			}),
		).rejects.toBeInstanceOf(Error);

		vi.restoreAllMocks();
	});
});
