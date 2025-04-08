import type { Book, Prisma } from "@prisma/client";

export interface IBooksRepository {
	searchMany(query: string, page: number): Promise<Book[]>;
	create(data: Prisma.BookCreateInput): Promise<Book>;
}
