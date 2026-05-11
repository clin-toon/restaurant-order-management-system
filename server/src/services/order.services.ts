import pool from "../config/db";
import { AppError } from "../utils/AppError";

export async function createOrderService(userId: any) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

       // fetching all the items present in the cart table 
        const cartResult = await client.query(
            `SELECT c.food_item_id, c.quantity, f.price
             FROM cart c
             JOIN food_items f ON c.food_item_id = f.id
             WHERE c.cart_user = $1`,
            [userId]
        );

        if (cartResult.rows.length === 0) {
          
            throw new AppError("Your cart is empty", 400);
        }

    
        const total = cartResult.rows.reduce(
            (sum, item) => sum + Number(item.price) * item.quantity,
            0
        );

        
        const orderResult = await client.query(
            `INSERT INTO orders (customer_id, total_amount, order_status)
             VALUES ($1, $2, 'pending')
             RETURNING id, total_amount, order_status, created_at`,
            [userId, total]
        );

        const orderId = orderResult.rows[0].id;

        
        await client.query(
            `INSERT INTO order_items (order_id, food_item_id, quantity, unit_price)
             SELECT $1, c.food_item_id, c.quantity, f.price
             FROM cart c
             JOIN food_items f ON c.food_item_id = f.id
             WHERE c.cart_user = $2`,
            [orderId, userId]
        );

        // 5. Clear cart
        await client.query(
            `DELETE FROM cart WHERE cart_user = $1`,
            [userId]
        );

        await client.query("COMMIT");

        
        return orderResult.rows[0];

    } catch (error: any) {
        await client.query("ROLLBACK");
        
        // If it's already an AppError (like "Cart is empty"), re-throw it
        if (error instanceof AppError) throw error;
        
        // Otherwise, wrap unexpected DB errors
        console.error("Order Transaction Error:", error);
        throw new AppError("Failed to process order. Please try again.", 500);

    } finally {
        // Essential: always release the client back to the pool
        client.release();
    }
}


export async function getUserOrdersService(userId: any) {
  const query = `
    SELECT 
      o.id, 
      o.total_amount, 
      o.order_status, 
      o.payment_status, 

      JSON_AGG(
        JSON_BUILD_OBJECT(
          'item_id', oi.food_item_id,
          'name', f.name,
          'quantity', oi.quantity,
          'unit_price', oi.unit_price,
          'image', f.image_url
        )
      ) AS items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN food_items f ON oi.food_item_id = f.id
    WHERE o.customer_id = $1
    GROUP BY o.id
    ORDER BY o.created_at DESC;
  `;

  try {
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (error: any) {
    console.error("Fetch Orders Error:", error);
    throw new AppError("Could not retrieve order history", 500);
  }
}

export const updateOrderStatusService = async (orderId: string, newStatus: string) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");    
    const updateQuery = `
      UPDATE orders 
      SET 
        order_status = $1, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 
        AND order_status NOT IN ('delivered', 'cancelled')
      RETURNING id, customer_id, order_status, updated_at;
    `;

    const orderRes = await client.query(updateQuery, [newStatus, orderId]);

    if (orderRes.rowCount === 0) {
      throw new AppError("Order not found or status cannot be changed (already finalized)", 400);
    }

    await client.query("COMMIT");
    return orderRes.rows[0];

  } catch (error) {
    await client.query("ROLLBACK");
    throw error; 
  } finally {
    client.release();
  }
};