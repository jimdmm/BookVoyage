import type { Book, Prisma } from "@prisma/client";

export interface IBooksRepository {
	searchMany(query: string, page: number): Promise<Book[]>;
	create(data: Prisma.BookCreateInput): Promise<Book>;
	update(id: string, bookUpdateInput: Partial<Book>): Promise<Book | null>;
	delete(id: string): Promise<boolean>;
}
