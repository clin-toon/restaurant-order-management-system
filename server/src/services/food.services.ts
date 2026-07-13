import pool from "../config/db";
import { AppError } from "../utils/AppError";
/*
 This service implements pagination
 for displaying food items on
 the home page based on the query 
 parameter page and returns the 
 result to controller
*/

export const getAllFoods = async (page: any) => {
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
  const result = await pool.query(query);
  return result.rows;
};

/*
This service querys database by creating
dynamic query based on the query parameters and 
return results to the controller
*/

export const findFoodByFilter = async (
  query: any,
  cat: any,
  maximumPrice: any,
  minimumPrice: any,
  is_vegetarian: any,
  limit: any,
  page: any,
  sort: any,
  sub_category: any,
) => {
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
    conditions.push(
      `(name ILIKE $${values.length} OR description ILIKE $${values.length})`,
    );
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
  const result = await pool.query(sql, values);

  if (result.rows.length === 0) {
    return { food_items: result.rows, total_pages: 0 };
  }

  return { food_items: result.rows, total_pages: result.rows[0].count };
};

/*
This service querys database based on
the id provided and  
return results to the controller
*/
export const findFoodById = async (id: any) => {
  const query = `SELECT * from food_items where id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows;
};

// service for the landing page

export const fetchLandingPageDetails = async () => {
  const mostOrderedItems = `SELECT ft.id, ft.name,ft.image_url,ft.price,ft.category, COUNT(*) as orders
FROM order_items oi
JOIN food_items ft ON ft.id = oi.food_item_id
GROUP BY ft.id
ORDER BY orders DESC
LIMIT 6;`;
  try {
    const res = await pool.query(mostOrderedItems);
    return res.rows;
  } catch (error) {
    throw new AppError(error, 500);
  }
};

export const fetchUserRecommend = async (userId: any) => {
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
    const res = await pool.query(recommendFooItems, [userId]);

    return res.rows;
  } catch (error: any) {
    console.log(error);
    throw new AppError(error, 500);
  }
};
