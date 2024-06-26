"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    fullname: zod_1.z.string(),
    phone: zod_1.z.string(),
    address: zod_1.z.string(),
    score: zod_1.z.number()
});
