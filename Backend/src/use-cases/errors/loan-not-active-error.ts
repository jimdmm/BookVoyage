export class LoanNotActiveError extends Error {
	constructor() {
		super('Only active loans can be renewed.');
	}
}
