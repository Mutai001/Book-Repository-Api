"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = exports.loginUserSchema = exports.statusCatalogSchema = exports.restuarantOwnerSchema = exports.orderStatusSchema = exports.orderMenuItemSchema = exports.driverSchema = exports.orderSchema = exports.commentSchema = exports.addressSchema = exports.menuItemSchema = exports.categorySchema = exports.restaurantSchema = exports.citySchema = exports.stateSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string(),
    contact_phone: zod_1.z.string(),
    phone_verified: zod_1.z.boolean(),
    email: zod_1.z.string(),
    email_verified: zod_1.z.boolean(),
    confirmation_code: zod_1.z.string()
});
exports.stateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    code: zod_1.z.string(),
    city: zod_1.z.string()
});
exports.citySchema = zod_1.z.object({
    name: zod_1.z.string(),
    state_id: zod_1.z.number(),
    address: zod_1.z.string(),
    state: zod_1.z.string(),
    restaurant: zod_1.z.string(),
});
exports.restaurantSchema = zod_1.z.object({
    name: zod_1.z.string(),
    street_address: zod_1.z.string(),
    zip_code: zod_1.z.string(),
    city_id: zod_1.z.number(),
    menu_item: zod_1.z.string(),
    orders: zod_1.z.string(),
    city: zod_1.z.string(),
    restaurant_owner: zod_1.z.string()
});
exports.categorySchema = zod_1.z.object({
    name: zod_1.z.string(),
    menu_item: zod_1.z.string()
});
exports.menuItemSchema = zod_1.z.object({
    name: zod_1.z.string(),
    restaurant_id: zod_1.z.number(),
    category_id: zod_1.z.number(),
    description: zod_1.z.string(),
    ingredients: zod_1.z.string(),
    active: zod_1.z.boolean()
});
exports.addressSchema = zod_1.z.object({
    street_address_1: zod_1.z.string(),
    street_address_2: zod_1.z.string(),
    zip_code: zod_1.z.string(),
    delivery_instructions: zod_1.z.string(),
    user_id: zod_1.z.number(),
    city_id: zod_1.z.number()
});
exports.commentSchema = zod_1.z.object({
    order_id: zod_1.z.number(),
    user_id: zod_1.z.number(),
    comment_text: zod_1.z.string(),
    is_complaint: zod_1.z.boolean(),
    is_praise: zod_1.z.boolean()
});
exports.orderSchema = zod_1.z.object({
    restaurant_id: zod_1.z.number(),
    delivery_address_id: zod_1.z.number(),
    user_id: zod_1.z.number(),
    driver_id: zod_1.z.number(),
    price: zod_1.z.number().multipleOf(0.01),
    order_menu_item: zod_1.z.string(),
    order_status: zod_1.z.string(),
    restaurant: zod_1.z.string(),
});
exports.driverSchema = zod_1.z.object({
    car_make: zod_1.z.string(),
    car_model: zod_1.z.string(),
    car_year: zod_1.z.number(),
    user_id: zod_1.z.number(),
    online: zod_1.z.boolean(),
    delivering: zod_1.z.boolean(),
    users: zod_1.z.string(),
    orders: zod_1.z.string(),
});
exports.orderMenuItemSchema = zod_1.z.object({
    order_id: zod_1.z.number(),
    menu_item_id: zod_1.z.number(),
    quantity: zod_1.z.number(),
    item_price: zod_1.z.number().multipleOf(0.01),
    price: zod_1.z.number().multipleOf(0.01),
    comment: zod_1.z.string(),
    users: zod_1.z.string(),
    menu_item: zod_1.z.string(),
    orders: zod_1.z.string()
});
exports.orderStatusSchema = zod_1.z.object({
    order_id: zod_1.z.number(),
    status_catalog_id: zod_1.z.number(),
    orders: zod_1.z.string(),
    status_catalog: zod_1.z.string()
});
exports.restuarantOwnerSchema = zod_1.z.object({
    restaurant_id: zod_1.z.number(),
    owner_id: zod_1.z.number(),
    users: zod_1.z.string(),
    restaurant: zod_1.z.string()
});
exports.statusCatalogSchema = zod_1.z.object({
    name: zod_1.z.string(),
    order_status: zod_1.z.string()
});
exports.loginUserSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.registerUserSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string().optional(),
});
