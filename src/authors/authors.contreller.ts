import { Context } from "hono";
import { CreateAuthors, DeleteAuthor, fetchOneAuthor, getAuthors,UpdateAuthor } from "./authors.service";

//fetch all authors
export const getAllAuthorsData = async (c: Context) => {

 try {
        //limit the number of author to be returned

        const limit = Number(c.req.query('limit'))

        const data = await getAuthors(limit);
        if (data == null || data.length == 0) {
            return c.text("author not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }


}

// fetch one author
export const getOneAuthorsData = async (c: Context) => {
    const id = c.req.param("id")
    const author = await fetchOneAuthor(parseInt(id))
    if(author === undefined){
        return c.json({message: "No author found"},404)
    }
    return c.json(author,200)
}

//create author
export const createAuthorsData = async (c: Context, next: Function) => {
    
    try{
       const author = await c.req.json()
    const response = await CreateAuthors(author)
    return c.json({message: response},201)
    } catch(err){
        return c.json({message: err},500)
    }
}

//update author
export const updateAuthorsData = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const authors = await c.req.json();
        const author = await UpdateAuthor(id, authors);

        if (!UpdateAuthor) return c.text('author not updated', 400);
        return c.json({ msg: UpdateAuthor }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

//delete author
export const deleteAuthorsData = async (c: Context) => {
    const id = c.req.param("id")   
    const response = await DeleteAuthor(parseInt(id))
    return c.json({message: response},200)

}