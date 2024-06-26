"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.insertBook = exports.getBookById = exports.listAllBooks = void 0;
const books_service_1 = require("./books.service");
//list of cities
const listAllBooks = async (c) => {
    try {
        const books = await (0, books_service_1.booksService)();
        if (books === null)
            return c.text("No books found");
        return c.json(books, 200);
    }
    catch (error) {
        return c.text("Error while fetching books", 400);
    }
};
exports.listAllBooks = listAllBooks;
//get city by id
const getBookById = async (c) => {
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        //search for city    
        const book = await (0, books_service_1.getBookByIdService)(id);
        if (book === undefined)
            return c.text("Book not found 😒", 404);
        return c.json(book, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.getBookById = getBookById;
//insert book
const insertBook = async (c) => {
    try {
        const book = await c.req.json();
        const createdBook = await (0, books_service_1.insertBookService)(book);
        if (createdBook === undefined) {
            return c.text("Error while inserting book", 400);
        }
        return c.json(createdBook, 201);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.insertBook = insertBook;
//update city
const updateBook = async (c) => {
    // return c.text("Not implemented yet", 501);
    const id = Number(c.req.param("id"));
    const book = await c.req.json();
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        //search for city
        const existingBook = await (0, books_service_1.getBookByIdService)(id);
        if (existingBook === undefined)
            return c.text("Book not found", 404);
        //update city
        const updatedBook = await (0, books_service_1.updateBookService)(id, book);
        return c.json({ msg: updatedBook }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.updateBook = updateBook;
//delete city
const deleteBook = async (c) => {
    // return c.text("Not implemented yet", 501);
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        //search for book
        const existingBook = await (0, books_service_1.getBookByIdService)(id);
        if (existingBook === undefined)
            return c.text("Book not found", 404);
        //delete book
        const deletedBook = await (0, books_service_1.deleteBookService)(id);
        return c.json({ msg: deletedBook }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.deleteBook = deleteBook;
