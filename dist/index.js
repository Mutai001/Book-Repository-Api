"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
require("dotenv/config");
const prometheus_1 = require("@hono/prometheus");
const books_router_1 = require("./books/books.router");
const app = new hono_1.Hono();
const { printMetrics, registerMetrics } = (0, prometheus_1.prometheus)();
//3rd party middleware
app.use('*', registerMetrics);
app.use('*', (0, cors_1.cors)());
app.use('*', (0, cors_1.cors)({
    origin: ['http://localhost:5173', 'https://red-sea-0ebf43a0f.5.azurestaticapps.net'],
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
}));
//default routes
app.get('/', (c) => {
    return c.text('The server is running 🚀🚀 ');
});
app.notFound((c) => {
    return c.text('Route Not Found', 404);
});
app.get('/metrics', printMetrics);
//custom routes
app.route("/", books_router_1.bookRouter);
console.log("Server is running on port " + process.env.PORT || 3000);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT || 3000)
});
