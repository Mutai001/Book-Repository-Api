"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookService = exports.updateBookService = exports.insertBookService = exports.getBookByIdService = exports.booksService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const booksService = async () => {
    return await db_1.default.query.bookTable.findMany();
};
exports.booksService = booksService;
const getBookByIdService = async (id) => {
    return await db_1.default.query.bookTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.bookTable.book_id, id)
    });
};
exports.getBookByIdService = getBookByIdService;
// insertBookService function adjusted to return the created book
const insertBookService = async (book) => {
    const result = await db_1.default.insert(schema_1.bookTable).values(book)
        .returning({ book_id: schema_1.bookTable.book_id, title: schema_1.bookTable.title, author: schema_1.bookTable.author, year: schema_1.bookTable.year })
        .execute();
    if (result) {
        // Assuming result is an array with the inserted book as the first item
        const createdBook = result[0];
        return createdBook;
    }
    else {
        throw new Error("Failed to insert book");
    }
};
exports.insertBookService = insertBookService;
const updateBookService = async (id, book) => {
    await db_1.default.update(schema_1.bookTable).set(book).where((0, drizzle_orm_1.eq)(schema_1.bookTable.book_id, id));
    return "Book updated successfully 🎉";
};
exports.updateBookService = updateBookService;
const deleteBookService = async (id) => {
    await db_1.default.delete(schema_1.bookTable).where((0, drizzle_orm_1.eq)(schema_1.bookTable.book_id, id));
    return "Book deleted successfully 🎉";
};
exports.deleteBookService = deleteBookService;
