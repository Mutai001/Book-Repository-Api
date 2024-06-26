"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookValidator = exports.createBookValidator = void 0;
const zod_1 = require("zod");
exports.createBookValidator = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    year: zod_1.z.number()
});
exports.updateBookValidator = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    year: zod_1.z.number()
});
