"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const logger_1 = require("hono/logger");
const csrf_1 = require("hono/csrf");
const prometheus_1 = require("@hono/prometheus");
const trailing_slash_1 = require("hono/trailing-slash");
const http_exception_1 = require("hono/http-exception");
const timeout_1 = require("hono/timeout");
const user_router_1 = require("./drizzle/users/user.router");
const address_router_1 = require("./drizzle/address/address.router");
const category_router_1 = require("./drizzle/category/category.router");
const city_router_1 = require("./drizzle/city/city.router");
const comments_router_1 = require("./drizzle/comments/comments.router");
const drivers_router_1 = require("./drizzle/drivers/drivers.router");
const menu_item_router_1 = require("./drizzle/menu_item/menu_item.router");
const order_menu_item_router_1 = require("./drizzle/order_menu_item/order_menu_item.router");
const orders_router_1 = require("./drizzle/orders/orders.router");
const order_status_router_1 = require("./drizzle/orders_status/order_status.router");
const restaurant_router_1 = require("./drizzle/restaurant/restaurant.router");
const restaurant_owner_router_1 = require("./drizzle/restaurant_owner/restaurant_owner.router");
const state_router_1 = require("./drizzle/state/state.router");
const status_catalog_router_1 = require("./drizzle/status_catalog/status_catalog.router");
const auth_router_1 = require("./auth/auth.router");
const app = new hono_1.Hono().basePath('/api');
const customTimeoutException = () => new http_exception_1.HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
});
const { printMetrics, registerMetrics } = (0, prometheus_1.prometheus)();
// inbuilt middlewares
app.use((0, logger_1.logger)());
app.use((0, csrf_1.csrf)());
app.use((0, trailing_slash_1.trimTrailingSlash)());
app.use('*', registerMetrics);
app.use('/', (0, timeout_1.timeout)(10000, customTimeoutException));
app.use('*', registerMetrics);
app.get('/ok', (c) => {
    return c.text('The server is running☑️');
});
app.get('/timeout', async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 11000));
    return c.text("data after 5 seconds", 200);
});
app.get('/metrics', printMetrics);
//Routes
app.route('/', user_router_1.UserRouter);
app.route('/', address_router_1.addressRouter);
app.route('/', category_router_1.categoryRouter);
app.route('/', city_router_1.CityRouter);
app.route('/', comments_router_1.commentsRouter);
app.route('', drivers_router_1.driverRouter);
app.route('/', menu_item_router_1.menuItemRouter);
app.route('/', order_menu_item_router_1.OrderMenuItemRouter);
app.route('/', orders_router_1.ordersRouter);
app.route('/', order_status_router_1.OrderStatusRouter);
app.route('/', restaurant_router_1.restaurantRouter);
app.route('/', restaurant_owner_router_1.RestaurantOwnerRouter);
app.route('/', state_router_1.StateRouter);
app.route('/', status_catalog_router_1.status_catalogRouter);
app.route('/', category_router_1.categoryRouter);
app.route('/', auth_router_1.authRouter); // api/auth/register   or api/auth/login
// default route
app.get('/', (c) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restaurant API</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    header {
      background-color: #333;
      color: white;
      padding: 1rem 0;
      text-align: center;
    }
    main {
      padding: 2rem;
      max-width: 800px;
      margin: 2rem auto;
      background-color: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 1rem 0;
      position: absolute;
      width: 100%;
      bottom: 0;
    }
    h1 {
      color: #333;
    }
    p {
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <header>
    <h1>Welcome to Our Restaurant API</h1>
  </header>
  <main>
    <h1>Hello Hono!</h1>
    <p>Welcome to our restaurant API. Here you can find a variety of services to manage your restaurant data.</p>
  </main>
  <footer>
    <p>&copy; 2024 Restaurant API. All rights reserved.</p>
  </footer>
</body>
</html>
  `;
    return c.html(html);
});
// const port = 3000 
const port = Number(process.env.PORT);
console.log(`Server is running on port ${process.env.PORT}`);
app.get('/metrics', printMetrics);
console.log('Registered routes: ', app.routes);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: 3000,
});
