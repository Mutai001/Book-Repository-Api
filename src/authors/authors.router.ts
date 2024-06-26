import { Hono } from "hono";
import { createAuthorsData, deleteAuthorsData, getAllAuthorsData, getOneAuthorsData, updateAuthorsData} from "./authors.contreller";
import { zValidator } from "@hono/zod-validator";



export const AuthorRouter = new Hono();
AuthorRouter.get("/author", getAllAuthorsData);
AuthorRouter.get("/author/:id", getOneAuthorsData);
AuthorRouter.post("/author", createAuthorsData)
AuthorRouter.delete("/author/:id", deleteAuthorsData);
AuthorRouter.put("/author/:id", updateAuthorsData);