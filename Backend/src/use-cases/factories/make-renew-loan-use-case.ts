import { PrismaLoansRepository } from '@/repositories/prisma/prisma-loans-repository';
import { RenewLoanUseCase } from '../loans/renew-loan';

export function makeRenewLoanUseCase() {
	const loansRepository = new PrismaLoansRepository();
	const renewLoanUseCase = new RenewLoanUseCase(loansRepository);

	return renewLoanUseCase;
}
