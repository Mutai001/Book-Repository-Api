"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// State table 1
exports.bookTable = (0, pg_core_1.pgTable)('bookTable', {
    book_id: (0, pg_core_1.serial)('book_id').primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    author: (0, pg_core_1.text)('author').notNull(),
    year: (0, pg_core_1.integer)('year').notNull(),
    created_at: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updated_at: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
