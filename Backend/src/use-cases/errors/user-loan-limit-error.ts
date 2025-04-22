export class UserLoanLimitError extends Error {
	constructor() {
		super('User has already reached the limit of 2 borrowed books.');
	}
}
