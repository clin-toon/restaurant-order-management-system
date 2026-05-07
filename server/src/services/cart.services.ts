import pool from '../config/db';


/*
This service creates a new recrod of cart 
into the cart tbles by taking 
food detials as a parameter

*/

export const addItemToCart = async(userId:any , foodId:Number , quantity:Number) =>{


    const query = `INSERT INTO cart(
                cart_user , food_item_id,quantity)
                VALUES($1, $2, $3)`
    
    const itemsArr = [userId , foodId , quantity]

    const results = await pool.query(query , itemsArr)

    

   return  results.rows[0];


}


export const checkIfItemExistsInCart = async(userId:any , foodId:Number) =>{
    const query = `SELECT * from cart where food_item_id = $1 and cart_user = $2`
    const values = [foodId , userId]

    const results = await pool.query(query , values)
  

    return results.rowCount

}


export const editQuantityOfItemInCart= async(userId:any , foodId:Number , quantity:Number) =>{


    const query = `UPDATE cart 
    set quantity = $1 where cart_user = $2 and food_item_id = $3
      RETURNING *;
    `
    const values = [quantity , userId , foodId]

    const results = await pool.query(query , values)
   

    return results.rows
}


export const removeItemFromCart = async (userId: any, foodItemId: string) => {
    const query = `
        DELETE FROM cart 
        WHERE cart_user = $1 AND food_item_id = $2
        RETURNING *;
    `;
    
    const values = [userId, foodItemId];
    const result = await pool.query(query, values);

    return result.rows[0]; 
};
