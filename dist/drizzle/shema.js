"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCatalogRelations = exports.stateRelations = exports.restaurantRelations = exports.ordersRelations = exports.menuItemRelations = exports.driverRelations = exports.cityRelations = exports.categoryRelations = exports.usersRelations = exports.restaurantOwnerRelations = exports.orderStatusRelations = exports.orderMenuItemRelations = exports.commentRelations = exports.addressRelations = exports.restaurantOwner = exports.statusCatalog = exports.state = exports.restaurant = exports.orders = exports.orderStatus = exports.orderMenuItem = exports.menuItem = exports.driver = exports.comment = exports.city = exports.category = exports.address = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// User table definition
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    name: (0, pg_core_1.text)('name').notNull(), // User name
    contactPhone: (0, pg_core_1.text)('contact_phone').notNull(), // Contact phone number
    phoneVerified: (0, pg_core_1.boolean)('phone_verified').notNull(), // Whether phone is verified
    email: (0, pg_core_1.text)('email').notNull(), // Email address
    emailVerified: (0, pg_core_1.boolean)('email_verified').notNull(), // Whether email is verified
    confirmationCode: (0, pg_core_1.text)('confirmation_code').notNull(), // Confirmation code
    password: (0, pg_core_1.text)('password').notNull(), // Password
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull(), // Creation timestamp
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull(), // Update timestamp
});
// Address table definition
exports.address = (0, pg_core_1.pgTable)('address', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    streetAddress1: (0, pg_core_1.text)('street_address_1').notNull(), // Street address line 1
    streetAddress2: (0, pg_core_1.text)('street_address_2'), // Street address line 2
    zipCode: (0, pg_core_1.text)('zip_code').notNull(), // Zip code
    deliveryInstructions: (0, pg_core_1.text)('delivery_instructions'), // Delivery instructions
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id), // Foreign key to users table
    cityId: (0, pg_core_1.integer)('city_id').notNull().references(() => exports.city.id), // Foreign key to city table
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull(), // Creation timestamp
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull(), // Update timestamp
});
// Category table definition
exports.category = (0, pg_core_1.pgTable)('category', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    name: (0, pg_core_1.text)('name').notNull(), // Category name
});
// City table definition
exports.city = (0, pg_core_1.pgTable)('city', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    name: (0, pg_core_1.text)('name').notNull(), // City name
    stateId: (0, pg_core_1.integer)('state_id').notNull().references(() => exports.state.id), // Foreign key to state table
});
// Comment table definition
exports.comment = (0, pg_core_1.pgTable)('comment', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    orderId: (0, pg_core_1.integer)('order_id').notNull().references(() => exports.orders.id), // Foreign key to orders table
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id), // Foreign key to users table
    commentText: (0, pg_core_1.text)('comment_text').notNull(), // Comment text
    isComplaint: (0, pg_core_1.boolean)('is_complaint').notNull(), // Whether it's a complaint
    isPraise: (0, pg_core_1.boolean)('is_praise').notNull(), // Whether it's a praise
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull(), // Creation timestamp
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull(), // Update timestamp
});
// Driver table definition
exports.driver = (0, pg_core_1.pgTable)('driver', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    carMake: (0, pg_core_1.text)('car_make').notNull(), // Car make
    carModel: (0, pg_core_1.text)('car_model').notNull(), // Car model
    carYear: (0, pg_core_1.integer)('car_year').notNull(), // Car year
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id), // Foreign key to users table
    online: (0, pg_core_1.boolean)('online').notNull(), // Whether the driver is online
    delivering: (0, pg_core_1.boolean)('delivering').notNull(), // Whether the driver is delivering
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull(), // Creation timestamp
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull(), // Update timestamp
});
// MenuItem table definition
exports.menuItem = (0, pg_core_1.pgTable)('menu_item', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    name: (0, pg_core_1.text)('name').notNull(), // Menu item name
    restaurantId: (0, pg_core_1.integer)('restaurant_id').notNull().references(() => exports.restaurant.id), // Foreign key to restaurant table
    categoryId: (0, pg_core_1.integer)('category_id').notNull().references(() => exports.category.id), // Foreign key to category table
    description: (0, pg_core_1.text)('description').notNull(), // Description
    ingredients: (0, pg_core_1.text)('ingredients').notNull(), // Ingredients
    price: (0, pg_core_1.decimal)('price').notNull(), // Price
    active: (0, pg_core_1.boolean)('active').notNull(), // Whether the item is active
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull(), // Creation timestamp
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull(), // Update timestamp
});
// OrderMenuItem table definition
exports.orderMenuItem = (0, pg_core_1.pgTable)('order_menu_item', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    orderId: (0, pg_core_1.integer)('order_id').notNull().references(() => exports.orders.id), // Foreign key to orders table
    menuItemId: (0, pg_core_1.integer)('menu_item_id').notNull().references(() => exports.menuItem.id), // Foreign key to menu item table
    quantity: (0, pg_core_1.integer)('quantity').notNull(), // Quantity
    itemPrice: (0, pg_core_1.decimal)('item_price').notNull(), // Item price
    price: (0, pg_core_1.decimal)('price').notNull(), // Price
    comment: (0, pg_core_1.text)('comment'), // Comment
});
// OrderStatus table definition
exports.orderStatus = (0, pg_core_1.pgTable)('order_status', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    orderId: (0, pg_core_1.integer)('order_id').notNull().references(() => exports.orders.id), // Foreign key to orders table
    statusCatalogId: (0, pg_core_1.integer)('status_catalog_id').notNull().references(() => exports.statusCatalog.id), // Foreign key to status catalog table
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull(), // Creation timestamp
});
// Orders table definition
exports.orders = (0, pg_core_1.pgTable)('orders', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    restaurantId: (0, pg_core_1.integer)('restaurant_id').notNull().references(() => exports.restaurant.id), // Foreign key to restaurant table
    estimatedDeliveryTime: (0, pg_core_1.timestamp)('estimated_delivery_time').notNull(), // Estimated delivery time
    actualDeliveryTime: (0, pg_core_1.timestamp)('actual_delivery_time'), // Actual delivery time
    deliveryAddressId: (0, pg_core_1.integer)('delivery_address_id').notNull().references(() => exports.address.id), // Foreign key to address table
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id), // Foreign key to users table
    driverId: (0, pg_core_1.integer)('driver_id').notNull().references(() => exports.driver.id), // Foreign key to driver table
    price: (0, pg_core_1.decimal)('price').notNull(), // Price
    discount: (0, pg_core_1.decimal)('discount'), // Discount
    finalPrice: (0, pg_core_1.decimal)('final_price').notNull(), // Final price
    comment: (0, pg_core_1.text)('comment'), // Comment
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull(), // Creation timestamp
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull(), // Update timestamp
});
// Restaurant table definition
exports.restaurant = (0, pg_core_1.pgTable)('restaurant', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    name: (0, pg_core_1.text)('name').notNull(), // Restaurant name
    streetAddress: (0, pg_core_1.text)('street_address').notNull(), // Street address
    zipCode: (0, pg_core_1.text)('zip_code').notNull(), // Zip code
    cityId: (0, pg_core_1.integer)('city_id').notNull().references(() => exports.city.id), // Foreign key to city table
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull(), // Creation timestamp
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull(), // Update timestamp
});
// State table definition
exports.state = (0, pg_core_1.pgTable)('state', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    name: (0, pg_core_1.text)('name').notNull(), // State name
    code: (0, pg_core_1.text)('code').notNull(), // State code
});
// StatusCatalog table definition
exports.statusCatalog = (0, pg_core_1.pgTable)('status_catalog', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    name: (0, pg_core_1.text)('name').notNull(), // Status name
});
// RestaurantOwner table definition
exports.restaurantOwner = (0, pg_core_1.pgTable)('restaurant_owner', {
    id: (0, pg_core_1.serial)('id').primaryKey(), // Primary key
    restaurantId: (0, pg_core_1.integer)('restaurant_id').notNull().references(() => exports.restaurant.id), // Foreign key to restaurant table
    ownerId: (0, pg_core_1.integer)('owner_id').notNull().references(() => exports.users.id), // Foreign key to users table
});
// Relations
// 1-1 relationships: User and address , city and address
exports.addressRelations = (0, drizzle_orm_1.relations)(exports.address, ({ one }) => ({
    user: one(exports.users, { fields: [exports.address.userId], references: [exports.users.id] }), // One address belongs to one user
    city: one(exports.city, { fields: [exports.address.cityId], references: [exports.city.id] }), // One address belongs to one city
}));
//1-1 relationships: comment and order, comment and user
exports.commentRelations = (0, drizzle_orm_1.relations)(exports.comment, ({ one }) => ({
    order: one(exports.orders, { fields: [exports.comment.orderId], references: [exports.orders.id] }), // One comment belongs to one order
    user: one(exports.users, { fields: [exports.comment.userId], references: [exports.users.id] }), // One comment belongs to one user
}));
//1-1 relationships:  order menu item and order, order menu item and menu item
exports.orderMenuItemRelations = (0, drizzle_orm_1.relations)(exports.orderMenuItem, ({ one }) => ({
    order: one(exports.orders, { fields: [exports.orderMenuItem.orderId], references: [exports.orders.id] }), // One order menu item belongs to one order
    menuItem: one(exports.menuItem, { fields: [exports.orderMenuItem.menuItemId], references: [exports.menuItem.id] }), // One order menu item belongs to one menu item
}));
// 1-1 relationships: order staus and order, order status and order catalog
exports.orderStatusRelations = (0, drizzle_orm_1.relations)(exports.orderStatus, ({ one }) => ({
    order: one(exports.orders, { fields: [exports.orderStatus.orderId], references: [exports.orders.id] }), // One order status belongs to one order
    statusCatalog: one(exports.statusCatalog, { fields: [exports.orderStatus.statusCatalogId], references: [exports.statusCatalog.id] }), // One order status belongs to one status catalog
}));
//1-1 relationships: restaurant owner and restaurant, restaurant owner and user.
exports.restaurantOwnerRelations = (0, drizzle_orm_1.relations)(exports.restaurantOwner, ({ one }) => ({
    restaurant: one(exports.restaurant, { fields: [exports.restaurantOwner.restaurantId], references: [exports.restaurant.id] }), // One restaurant owner owns one restaurant
    user: one(exports.users, { fields: [exports.restaurantOwner.ownerId], references: [exports.users.id] }), // One restaurant owner is one user
}));
//1-N relationships   between users _ address, coments, drivers, restorants  
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ one, many }) => ({
    address: many(exports.address), // One user can have many addresses
    comments: many(exports.comment), // One user can have many comments
    drivers: many(exports.driver), // One user can be associated with many drivers
    orders: many(exports.orders), // One user can have many orders
    restaurantOwners: many(exports.restaurantOwner), // One user can own many restaurants
}));
// 1-N relationships: Category and menu-items
exports.categoryRelations = (0, drizzle_orm_1.relations)(exports.category, ({ many }) => ({
    menuItems: many(exports.menuItem), // One category can have many menu items
}));
// 1-N relationships: one city and many states, one city and may adresses, one city and many restaurants.
exports.cityRelations = (0, drizzle_orm_1.relations)(exports.city, ({ one, many }) => ({
    state: one(exports.state, { fields: [exports.city.stateId], references: [exports.state.id] }), // One city belongs to one state
    addresses: many(exports.address), // One city can have many addresses
    restaurants: many(exports.restaurant), // One city can have many restaurants
}));
//1-N relatiships: driver and user, driver and order
exports.driverRelations = (0, drizzle_orm_1.relations)(exports.driver, ({ one, many }) => ({
    user: one(exports.users, { fields: [exports.driver.userId], references: [exports.users.id] }), // One driver is associated with one user
    orders: many(exports.orders), // One driver can have many orders
}));
//1-N relationships: menu_item and restorant, menu_item and category, menu item and items
exports.menuItemRelations = (0, drizzle_orm_1.relations)(exports.menuItem, ({ one, many }) => ({
    restaurant: one(exports.restaurant, { fields: [exports.menuItem.restaurantId], references: [exports.restaurant.id] }), // One menu item belongs to one restaurant
    category: one(exports.category, { fields: [exports.menuItem.categoryId], references: [exports.category.id] }), // One menu item belongs to one category
    orderMenuItems: many(exports.orderMenuItem), // One menu item can be part of many order menu items
}));
// 1-N relationships: order and restaurant, order and and address, order and user, order and driver, order and menu items,order and status
exports.ordersRelations = (0, drizzle_orm_1.relations)(exports.orders, ({ one, many }) => ({
    restaurant: one(exports.restaurant, { fields: [exports.orders.restaurantId], references: [exports.restaurant.id] }), // One order belongs to one restaurant
    address: one(exports.address, { fields: [exports.orders.deliveryAddressId], references: [exports.address.id] }), // One order is delivered to one address
    user: one(exports.users, { fields: [exports.orders.userId], references: [exports.users.id] }), // One order belongs to one user
    driver: one(exports.driver, { fields: [exports.orders.driverId], references: [exports.driver.id] }), // One order is delivered by one driver
    orderMenuItems: many(exports.orderMenuItem), // One order can have many order menu items
    orderStatuses: many(exports.orderStatus), // One order can have many statuses
}));
//1-N relationships: restoraunt and city, restaurant and items, restaurant and orders, restaurant and owners
exports.restaurantRelations = (0, drizzle_orm_1.relations)(exports.restaurant, ({ one, many }) => ({
    city: one(exports.city, { fields: [exports.restaurant.cityId], references: [exports.city.id] }), // One restaurant belongs to one city
    menuItems: many(exports.menuItem), // One restaurant can have many menu items
    orders: many(exports.orders), // One restaurant can have many orders
    restaurantOwners: many(exports.restaurantOwner), // One restaurant can have many owners
}));
//1-N relationships: state and cities
exports.stateRelations = (0, drizzle_orm_1.relations)(exports.state, ({ many }) => ({
    cities: many(exports.city), // One state can have many cities
}));
// 1-many relationships: status catalog and order status
exports.statusCatalogRelations = (0, drizzle_orm_1.relations)(exports.statusCatalog, ({ many }) => ({
    orderStatuses: many(exports.orderStatus), // One status catalog can have many order statuses
}));
