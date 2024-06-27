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
app.get('/', (c) => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Repository</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        
        header {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 1em 0;
            position: relative;
        }

        header h1 {
            margin: 0;
            font-size: 2.5em;
        }

        nav {
            background-color: #444;
            color: #fff;
            padding: 0.5em;
            display: flex;
            justify-content: center;
        }

        nav a {
            color: #fff;
            padding: 0.5em 1em;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }

        nav a:hover {
            background-color: #555;
        }

        .container {
            padding: 2em;
        }

        .book-card {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            margin: 1em;
            padding: 1em;
            transition: transform 0.3s ease;
        }

        .book-card:hover {
            transform: translateY(-10px);
        }

        .book-title {
            font-size: 1.5em;
            margin: 0 0 0.5em 0;
        }

        .book-author {
            color: #555;
            margin: 0.5em 0;
        }

        .book-description {
            color: #777;
        }

        footer {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 1em 0;
            position: relative;
            bottom: 0;
            width: 100%;
        }

        footer p {
            margin: 0;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .book-card {
            animation: slideIn 0.5s ease-out;
        }
    </style>
</head>
<body>

<header>
    <h1>Cyrus Book Repository</h1>
</header>

<nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="# GET http://localhost:3000/books">Books</a>
    <a href="#">Contact</a>
</nav>

<div class="container">
    <div class="book-card">
        <h2 class="book-title">Book Title 1</h2>
        <p class="book-author">by Author 1</p>
        <p class="book-description">Read more about the book in the description</p>
    </div>
    <div class="book-card">
        <h2 class="book-title">Book Title 2</h2>
        <p class="book-author">by Author 2</p>
        <p class="book-description">Read more about the book in the description</p>
    </div>
    <div class="book-card">
        <h2 class="book-title">Book Title 3</h2>
        <p class="book-author">by Author 3</p>
        <p class="book-description">Read more about the book in the description</p>
    </div>
</div>

<footer>
    <p>&copy; 2024 Cyrus Book Repository</p>
</footer>

</body>
</html> `;
    return c.html(html);
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
