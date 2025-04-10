import type { Book, Prisma } from "@prisma/client";

export interface IBooksRepository {
	searchMany(query: string, page: number): Promise<Book[]>;
	findById(id: string): Promise<Book | null>;
	create(data: Prisma.BookCreateInput): Promise<Book>;
	update(id: string, bookUpdateInput: Partial<Book>): Promise<Book | null>;
	delete(id: string): Promise<boolean>;
}
