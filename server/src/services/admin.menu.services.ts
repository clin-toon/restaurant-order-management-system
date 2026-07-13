import pool from "../config/db";
import { AppError } from "../utils/AppError";
import type { FoodItemInput } from "../validators/admin/menu.schema";

export const createNewItemService = async (
  food_details: FoodItemInput,
  imageUrl: string,
) => {
  const { name, description, price, category, is_available, is_vegetarian } =
    food_details;
  const query = `INSERT INTO food_items
                (name, description , price , category , is_available , is_vegetarian, image_url)
                VALUES ($1, $2, $3, $4, $5,$6,$7)
                 RETURNING id, name,description,price,category,is_available,is_vegetarian,image_url, created_at;
                `;
  const values = [
    name,
    description,
    price,
    category,
    is_available,
    is_vegetarian,
    imageUrl,
  ];

  try {
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error: any) {
    console.log(error);
    throw new AppError(error, 500);
  }
};

export const toogleStatusOfFoodService = async (
  foodid: string,
  status: boolean,
) => {
  try {
    const query = `
        UPDATE food_items 
        SET is_available = $1 
        WHERE id = $2
        RETURNING name, price, category, is_available
    `;
    const values = [status, foodid];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      throw new AppError("Food item with that ID was not found", 404);
    }

    return result.rows[0];
  } catch (error: any) {
    // If it's already an AppError (the 404 we threw above), re-throw it
    if (error instanceof AppError) throw error;

    throw new AppError("Database update failed", 500);
  }
};

export const deleteFoodItemService = async (food_item_id: string) => {
  const query = `
        DELETE FROM food_items where id = $1
        RETURNING id, , price, category, is_available
    `;
  try {
    const result = await pool.query(query, [food_item_id]);
    if (result.rowCount === 0) {
      throw new AppError("Food item with that ID was not found", 404);
    }

    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
};
