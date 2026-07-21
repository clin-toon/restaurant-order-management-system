"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserRecommend = exports.fetchLandingPageDetails = exports.findFoodById = exports.findFoodByFilter = exports.getAllFoods = void 0;
const db_1 = __importDefault(require("../config/db"));
const AppError_1 = require("../utils/AppError");
/*
 This service implements pagination
 for displaying food items on
 the home page based on the query
 parameter page and returns the
 result to controller
*/
const getAllFoods = async (page) => {
    let offset = 0;
    if (page !== undefined) {
        offset = 5 * (page - 1);
    }
    const query = `
        SELECT id, name, description, price, image_url, category, is_available 
        FROM food_items 
        WHERE is_available = true 
        limit 10
        offset ${offset}
    `;
    const result = await db_1.default.query(query);
    return result.rows;
};
exports.getAllFoods = getAllFoods;
/*
This service querys database by creating
dynamic query based on the query parameters and
return results to the controller
*/
const findFoodByFilter = async (query, cat, maximumPrice, minimumPrice, is_vegetarian, limit, page, sort, sub_category) => {
    let orderBy = "";
    switch (sort) {
        case "high":
            orderBy = "price DESC";
            break;
        case "low":
            orderBy = "price ASC";
            break;
        case "asc":
            orderBy = "name ASC";
            break;
        case "dsc":
            orderBy = "name DESC";
            break;
        default:
            orderBy = "created_at DESC";
    }
    let sql = `SELECT *, COUNT(*) OVER() AS count FROM food_items`;
    const conditions = [];
    const values = [];
    let offset = 0;
    if (page !== undefined) {
        offset = 12 * (page - 1);
    }
    // Accumulate conditions (The order here defines the placeholder numbers)
    if (query) {
        values.push(`%${query}%`);
        conditions.push(`(name ILIKE $${values.length} OR description ILIKE $${values.length})`);
    }
    if (cat) {
        if (cat !== "all") {
            let cleaned = cat.replace(/^"|"$/g, "");
            values.push(cleaned);
            conditions.push(`category ILIKE $${values.length}`);
        }
    }
    if (sub_category) {
        values.push(sub_category);
        conditions.push(`sub_category ILIKE $${values.length}`);
    }
    if (is_vegetarian !== undefined) {
        values.push(is_vegetarian);
        conditions.push(`is_vegetarian = $${values.length}`);
    }
    if (minimumPrice) {
        values.push(minimumPrice);
        conditions.push(`price >= $${values.length}`);
    }
    if (maximumPrice) {
        values.push(maximumPrice);
        conditions.push(`price <= $${values.length}`);
    }
    if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(" AND ")}`;
    }
    if (sort) {
        sql += ` ORDER BY ${orderBy}`;
    }
    if (limit) {
        values.push(limit);
        sql += ` LIMIT $${values.length} `;
    }
    if (page) {
        values.push(offset);
        sql += `OFFSET $${values.length}`;
    }
    // 5. Execute
    const result = await db_1.default.query(sql, values);
    if (result.rows.length === 0) {
        return { food_items: result.rows, total_pages: 0 };
    }
    return { food_items: result.rows, total_pages: result.rows[0].count };
};
exports.findFoodByFilter = findFoodByFilter;
/*
This service querys database based on
the id provided and
return results to the controller
*/
const findFoodById = async (id) => {
    const query = `SELECT * from food_items where id = $1`;
    const result = await db_1.default.query(query, [id]);
    return result.rows;
};
exports.findFoodById = findFoodById;
// service for the landing page
const fetchLandingPageDetails = async () => {
    const mostOrderedItems = `SELECT ft.id, ft.name,ft.image_url,ft.price,ft.category, COUNT(*) as orders
FROM order_items oi
JOIN food_items ft ON ft.id = oi.food_item_id
GROUP BY ft.id
ORDER BY orders DESC
LIMIT 6;`;
    try {
        const res = await db_1.default.query(mostOrderedItems);
        return res.rows;
    }
    catch (error) {
        throw new AppError_1.AppError(error, 500);
    }
};
exports.fetchLandingPageDetails = fetchLandingPageDetails;
const fetchUserRecommend = async (userId) => {
    const recommendFooItems = ` select 
	       ft.id, ft.name, ft.image_url, ft.price, ft.category,
	        sum(od.quantity) as "orders"
        from customers c join orders o  on c.id = o.customer_id 
	        join order_items od 
	        on od.order_id  = o.id 
	        join food_items ft on ft.id = od.food_item_id
	    where c.id = $1
        group by ft.id, ft.name 
        order by orders desc, ft.name asc
        limit 6;`;
    try {
        const res = await db_1.default.query(recommendFooItems, [userId]);
        return res.rows;
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.AppError(error, 500);
    }
};
exports.fetchUserRecommend = fetchUserRecommend;
//# sourceMappingURL=food.services.js.map