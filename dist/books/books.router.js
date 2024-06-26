"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const hono_1 = require("hono");
const books_contreller_1 = require("./books.contreller");
const Svalidator_1 = require("../validators/Svalidator");
const zod_validator_1 = require("@hono/zod-validator");
exports.bookRouter = new hono_1.Hono();
//get all cities
exports.bookRouter.get('/books', books_contreller_1.listAllBooks);
//get city by id
exports.bookRouter.get('/book/:id', books_contreller_1.getBookById);
//insert city
exports.bookRouter.post('/books', (0, zod_validator_1.zValidator)('json', Svalidator_1.createBookValidator, (result, c) => {
    if (!result.success)
        return c.text(result.error.message + "😒", 400);
}), books_contreller_1.insertBook);
//update city
exports.bookRouter.put('/books/:id', books_contreller_1.updateBook);
//delete city
exports.bookRouter.delete('/books/:id', books_contreller_1.deleteBook);
