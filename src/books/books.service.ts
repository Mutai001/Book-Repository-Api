//Fetch all books
import { eq } from "drizzle-orm"
import db from '../drizzle/db';
import { booksSelect, booksTable, booksInsert } from '../drizzle/schema'

export const getAllBooks = async (limit?: number): Promise<booksInsert[] | null> => {
         
        return await db.query.booksTable.findMany();

}

// fetch one book
export const fetchOneBook = async (id: number): Promise<booksSelect | undefined> => {
return await db.query.booksTable.findFirst({
    where: eq(booksTable.id, id)
})
}

// create book
export const CreateBook = async (book: booksInsert) => {
    await db.insert(booksTable).values(book)
    return "book created successfully"
}

// update book
export const UpdateBook = async (id:number,book:booksInsert) => {
    await db.update(booksTable).set(book).where(eq(booksTable.id,id));
    return "book updated successfully"

}

// delete book
export const DeleteBook = async (id: number) => {
    await db.delete(booksTable).where(eq(booksTable.id, id))
    return "book deleted successfully"
}