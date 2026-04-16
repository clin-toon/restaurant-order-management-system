import pool from '../config/db';

export const getAllFoods = async () => {
    
    const query = `
        SELECT id, name, description, price, image_url, category, is_available 
        FROM food_items 
        WHERE is_available = true;
    `;
    const result = await pool.query(query);
    return result.rows;
};


export const getFoodByCategory = async()=>{
    
}