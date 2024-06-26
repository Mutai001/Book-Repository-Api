import { Hono } from "hono";
import { createBooksData, deleteBooksData, getAllBooksData, getOneBooksData, updateBooksData} from './books.contreller'
import { zValidator } from "@hono/zod-validator";


export const BookRouter = new Hono();
BookRouter.get("/book", getAllBooksData);
BookRouter.get("/book/:id", getOneBooksData);
BookRouter.post("/book", createBooksData)
BookRouter.delete("/book/:id", deleteBooksData);
BookRouter.put("/book/:id", updateBooksData);