export class LoanAlreadyReturnedError extends Error {
	constructor() {
		super("This book has already been returned.");
	}
}
