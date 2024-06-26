// import { z } from 'zod'


// export const userSchema = z.object({
//     name: z.string(),
//     contact_phone: z.string(),
//     phone_verified: z.boolean(),
//     email: z.string(),
//     email_verified: z.boolean(),
//     confirmation_code: z.string()
// })

// export const stateSchema = z.object({
//     name: z.string(),
//     code: z.string(),
//     city: z.string()
// })

// export const citySchema = z.object({
//     name: z.string(),
//     state_id: z.number(),
//     address: z.string(),
//     state: z.string(),
//     restaurant: z.string(),
// })

// export const restaurantSchema = z.object({
//     name: z.string(),
//     street_address: z.string(),
//     zip_code: z.string(),
//     city_id: z.number(),
//     menu_item: z.string(),
//     orders: z.string(),
//     city: z.string(),
//     restaurant_owner: z.string()
// })

// export const categorySchema = z.object({
//     name: z.string(),
//     menu_item: z.string()
// })

// export const menuItemSchema = z.object({
//     name: z.string(),
//     restaurant_id: z.number(),
//     category_id: z.number(),
//     description: z.string(),
//     ingredients: z.string(),
//     active: z.boolean()
// })
// export const addressSchema = z.object({
//     street_address_1: z.string(),
//     street_address_2: z.string(),
//     zip_code: z.string(),
//     delivery_instructions: z.string(),
//     user_id:z.number(),
//     city_id: z.number()
// })

// export const commentSchema = z.object({
//     order_id: z.number(),
//     user_id: z.number(),
//     comment_text: z.string(),
//     is_complaint: z.boolean(),
//     is_praise: z.boolean()
// })

// export const orderSchema = z.object({
//     restaurant_id: z.number(),
//     delivery_address_id: z.number(),
//     user_id: z.number(),
//     driver_id: z.number(),
//     price: z.number().multipleOf(0.01),
//     order_menu_item: z.string(),
//     order_status: z.string(),
//     restaurant: z.string(),
// })

// export const driverSchema = z.object({
//     car_make: z.string(),
//     car_model: z.string(),
//     car_year: z.number(),
//     user_id: z.number(),
//     online: z.boolean(),
//     delivering: z.boolean(),
//     users: z.string(),
//     orders: z.string(),
// })

// export const orderMenuItemSchema = z.object({
//     order_id: z.number(),
//     menu_item_id: z.number(),
//     quantity: z.number(),
//     item_price: z.number().multipleOf(0.01),
//     price: z.number().multipleOf(0.01),
//     comment: z.string(),
//     users: z.string(),
//     menu_item: z.string(),
//     orders: z.string()
// })

// export const orderStatusSchema = z.object({
//     order_id: z.number(),
//     status_catalog_id: z.number(),
//     orders: z.string(),
//     status_catalog: z.string()
// })

// export const restuarantOwnerSchema = z.object({
//     restaurant_id: z.number(),
//     owner_id: z.number(),
//     users: z.string(),
//     restaurant: z.string()
// })

// export const statusCatalogSchema = z.object({
//     name: z.string(),
//     order_status: z.string()
// })


// export const loginUserSchema = z.object({
//     username: z.string(),
//     password: z.string()
// })

// export const registerUserSchema = z.object({
//     userId: z.number(),
//     username: z.string(),
//     password: z.string(),
//     role: z.string().optional(),
// })