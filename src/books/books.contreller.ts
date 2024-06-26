import { Context } from "hono";
import { CreateBook, DeleteBook, fetchOneBook, getAllBooks,UpdateBook } from "./books.service";

//fetch all book
export const getAllBooksData = async (c: Context) => {

 try {
        //limit the number of books to be returned

        const limit = Number(c.req.query('limit'))

        const data = await getAllBooks(limit);
        if (data == null || data.length == 0) {
            return c.text("book not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }


}

// fetch one book
export const getOneBooksData = async (c: Context) => {
    const id = c.req.param("id")
    const book = await fetchOneBook(parseInt(id))
    if(book === undefined){
        return c.json({message: "No book found"},404)
    }
    return c.json(book,200)
}

//create book
export const createBooksData = async (c: Context, next: Function) => {
    
    try{
       const book = await c.req.json()
    const response = await CreateBook(book)
    return c.json({message: response},201)
    } catch(err){
        return c.json({message: err},500)
    }
}

//update book
export const updateBooksData = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const book = await c.req.json();
        const Book = await UpdateBook(id, book);

        if (!UpdateBook) return c.text('book not updated', 400);
        return c.json({ msg: UpdateBook }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

//delete book
export const deleteBooksData = async (c: Context) => {
    const id = c.req.param("id")   
    const response = await DeleteBook(parseInt(id))
    return c.json({message: response},200)

}