import {Hono} from "hono"
import { deleteBook, getBookById, insertBook, listAllBooks, updateBook } from "./books.contreller";
import { createBookValidator } from '../validators/Svalidator'
import { zValidator } from "@hono/zod-validator";

export const bookRouter = new Hono();

//get all books
bookRouter.get('/books', listAllBooks)

//get book by id
bookRouter.get('/book/:id', getBookById)

//insert book
bookRouter.post('/books', zValidator('json',createBookValidator,(result,c)=>{
    if(!result.success) return c.text( result.error.message + "😒",400)}), insertBook)

//update books
bookRouter.put('/books/:id', updateBook)

//delete books
bookRouter.delete('/books/:id', deleteBook)