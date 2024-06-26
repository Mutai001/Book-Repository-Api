import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define table for Author
export const authorsTable = pgTable('authors', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
});

// Define table for Book
export const booksTable = pgTable('books', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    authorId: integer('author_id').references(() => authorsTable.id).notNull(),
    publicationYear: integer('publication_year'),
});

// Define relationships
// export const authorsRelations = relations(authors, ({ many }) => ({
//     books: many(books, { fields: [books.authorId], references: [authors.id] }),
// }));

// export const booksRelations = relations(books, ({ one }) => ({
//     author: one(authors, { relationName: 'books', references: [authors.id] }),
// }));


export type  authorInsert = typeof authorsTable.$inferInsert;
export type  authorSelect = typeof authorsTable.$inferSelect;
export type  booksInsert = typeof booksTable.$inferInsert;
export type  booksSelect = typeof booksTable.$inferSelect;