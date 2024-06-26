"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthorsData = exports.updateAuthorsData = exports.createAuthorsData = exports.getOneAuthorsData = exports.getAllAuthorsData = void 0;
const authors_service_1 = require("./authors.service");
//fetch all authors
const getAllAuthorsData = async (c) => {
    try {
        //limit the number of author to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, authors_service_1.getAuthors)(limit);
        if (data == null || data.length == 0) {
            return c.text("author not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getAllAuthorsData = getAllAuthorsData;
// fetch one author
const getOneAuthorsData = async (c) => {
    const id = c.req.param("id");
    const author = await (0, authors_service_1.fetchOneAuthor)(parseInt(id));
    if (author === undefined) {
        return c.json({ message: "No author found" }, 404);
    }
    return c.json(author, 200);
};
exports.getOneAuthorsData = getOneAuthorsData;
//create author
const createAuthorsData = async (c, next) => {
    try {
        const author = await c.req.json();
        const response = await (0, authors_service_1.CreateAuthors)(author);
        return c.json({ message: response }, 201);
    }
    catch (err) {
        return c.json({ message: err }, 500);
    }
};
exports.createAuthorsData = createAuthorsData;
//update author
const updateAuthorsData = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const authors = await c.req.json();
        const author = await (0, authors_service_1.UpdateAuthor)(id, authors);
        if (!authors_service_1.UpdateAuthor)
            return c.text('author not updated', 400);
        return c.json({ msg: authors_service_1.UpdateAuthor }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateAuthorsData = updateAuthorsData;
//delete author
const deleteAuthorsData = async (c) => {
    const id = c.req.param("id");
    const response = await (0, authors_service_1.DeleteAuthor)(parseInt(id));
    return c.json({ message: response }, 200);
};
exports.deleteAuthorsData = deleteAuthorsData;
