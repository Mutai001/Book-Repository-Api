"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const hono_rate_limiter_1 = require("hono-rate-limiter");
exports.limiter = (0, hono_rate_limiter_1.rateLimiter)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    keyGenerator: (c) => "<unique_key>", // Method to generate custom identifiers for clients.
    // store: ... , // Redis, MemoryStore, etc. See below.
});
