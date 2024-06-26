"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAuthor = exports.UpdateAuthor = exports.CreateAuthors = exports.fetchOneAuthor = exports.getAuthors = void 0;
//Fetch all authors
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
//  '../schema';
const getAuthors = async (limit) => {
    return await db_1.default.query.authorsTable.findMany();
};
exports.getAuthors = getAuthors;
// fetch one authors
const fetchOneAuthor = async (id) => {
    return await db_1.default.query.authorsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.authorsTable.id, id)
    });
};
exports.fetchOneAuthor = fetchOneAuthor;
// create authors
const CreateAuthors = async (authors) => {
    await db_1.default.insert(schema_1.authorsTable).values(authors);
    return "author created successfully";
};
exports.CreateAuthors = CreateAuthors;
// update author
const UpdateAuthor = async (id, author) => {
    await db_1.default.update(schema_1.authorsTable).set(author).where((0, drizzle_orm_1.eq)(schema_1.authorsTable.id, id));
    return "author updated successfully";
};
exports.UpdateAuthor = UpdateAuthor;
// delete author
const DeleteAuthor = async (id) => {
    await db_1.default.delete(schema_1.authorsTable).where((0, drizzle_orm_1.eq)(schema_1.authorsTable.id, id));
    return "author deleted successfully";
};
exports.DeleteAuthor = DeleteAuthor;
