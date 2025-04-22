export class BookNotAvailableError extends Error {
	constructor() {
		super('The book is not available for loan.');
	}
}
