import pool from '../config/db';
/*
 This service implements pagination
 for displaying food items on
 the home page based on the query 
 parameter page and returns the 
 result to controller
*/

export const getAllFoods = async (page:any) => {
    let offset = 0

    if(page !==undefined){
        offset = 5 * (page -1)
    }

    const query = `
        SELECT id, name, description, price, image_url, category, is_available 
        FROM food_items 
        WHERE is_available = true 
        limit 5
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

export const findFoodByFilter = async(query:any ,cat:any , maximumPrice:any , minimumPrice:any , is_vegetarian:any,  limit:any)=>{
  let sql = `SELECT * FROM food_items`;
  const conditions = [];
  const values  = [];

  // Accumulate conditions (The order here defines the placeholder numbers)
  if(query){
    values.push(`%${query}%`);
    conditions.push(`(name ILIKE $${values.length} OR description ILIKE $${values.length})`);
  }

  if (cat) {
    let cleaned = cat.replace(/^"|"$/g, '');
    values.push(cleaned);
    conditions.push(`category ILIKE $${values.length}`);
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

  // 3. Construct the WHERE clause dynamically
  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }

  // 4. Handle Limit (Always goes last)
  if (limit) {
    values.push(limit);
    sql += ` LIMIT $${values.length}`;
  }

 
  // 5. Execute
  const result = await pool.query(sql, values);
  return result.rows;
};


/*
This service querys database based on
the id provided and  
return results to the controller
*/
export const findFoodById = async(id:any) =>{
    const query = `SELECT * from food_items where id = $1`
    const result = await pool.query(query , [id])
    return result.rows

}


