//Fetch all authors
import { eq } from "drizzle-orm"
import db from '../drizzle/db'
import { authorSelect, authorsTable,authorInsert } from '../drizzle/schema'
//  '../schema';

export const getAuthors = async (limit?: number): Promise<authorInsert[] | null> => {
    return await db.query.authorsTable.findMany()
     }

// fetch one authors
export const fetchOneAuthor = async (id: number): Promise<authorSelect | undefined> => {
return await db.query.authorsTable.findFirst({
    where: eq(authorsTable.id, id)
})
}

// create authors
export const CreateAuthors = async (authors: authorInsert) => {
    await db.insert(authorsTable).values(authors)
    return "author created successfully"
}

// update author
export const UpdateAuthor = async (id:number,author:authorInsert) => {
    await db.update(authorsTable).set(author).where(eq(authorsTable.id,id));
    return "author updated successfully"

}

// delete author
export const DeleteAuthor = async (id: number) => {
    await db.delete(authorsTable).where(eq(authorsTable.id, id))
    return "author deleted successfully"
}