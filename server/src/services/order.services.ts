import pool from "../config/db";
import { AppError } from "../utils/AppError";
import type { DeliveryAddressSchema } from "../validators/admin/order.schema";

export async function createOrderService(
  userId: any,
  delivery: DeliveryAddressSchema,
) {
  const {
    latitude,
    longitude,
    location_url,
    landmark,
    receiver_name,
    receiver_phone,
  } = delivery;
  try {
    await pool.query("BEGIN");

    // fetching all the items present in the cart table
    const cartResult = await pool.query(
      `SELECT c.food_item_id, c.quantity, f.price
             FROM cart c
             JOIN food_items f ON c.food_item_id = f.id
             WHERE c.cart_user = $1`,
      [userId],
    );

    if (cartResult.rows.length === 0) {
      throw new AppError("Your cart is empty", 400);
    }

    const total = cartResult.rows.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );

    const orderResult = await pool.query(
      `INSERT INTO orders (customer_id, total_amount, order_status)
             VALUES ($1, $2, 'pending')
             RETURNING id, total_amount, order_status, created_at`,
      [userId, total + 50],
    );

    const orderId = orderResult.rows[0].id;

    await pool.query(
      `INSERT INTO order_items (order_id, food_item_id, quantity, unit_price)
             SELECT $1, c.food_item_id, c.quantity, f.price
             FROM cart c
             JOIN food_items f ON c.food_item_id = f.id
             WHERE c.cart_user = $2`,
      [orderId, userId],
    );

    await pool.query(
      `INSERT INTO delivery_addresses 
            (latitude, longitude, location_url, landmark, receiver_name, receiver_phone, order_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        latitude,
        longitude,
        location_url,
        landmark,
        receiver_name,
        receiver_phone,
        orderId,
      ],
    );

    // 5. Clear cart
    await pool.query(`DELETE FROM cart WHERE cart_user = $1`, [userId]);

    await pool.query("COMMIT");

    return orderResult.rows[0];
  } catch (error: any) {
    await pool.query("ROLLBACK");

    // If it's already an AppError (like "Cart is empty"), re-throw it
    if (error instanceof AppError) throw error;

    // Otherwise, wrap unexpected DB errors
    console.error("Order Transaction Error:", error);
    throw new AppError("Failed to process order. Please try again.", 500);
  }
}

export async function getUserOrdersService(userId: any) {
  const query = `
   SELECT 
  O.id AS order_id,

  JSON_BUILD_OBJECT(
    'landmark', D.landmark,
    'latitude', D.latitude,
    'longitude', D.longitude,
    'location_url', D.location_url
  ) AS delivery_address,

  JSON_BUILD_OBJECT(
    'order_id', O.id,
    'total_amount', O.total_amount,
    'order_status', O.order_status,
    'payment_status', O.payment_status
  ) AS order,


  (
    SELECT JSON_AGG(
      JSON_BUILD_OBJECT(
        'food_item', ft.name,
        'food_image_url', ft.image_url,
        'quantity', ot.quantity,
        'sub_total', ot.subtotal
      )
    )
    FROM order_items ot
    JOIN food_items ft ON ft.id = ot.food_item_id
    WHERE ot.order_id = O.id
  ) AS order_details

FROM orders O
JOIN delivery_addresses D ON D.order_id = O.id
WHERE O.customer_id = $1;
`;

  try {
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (error: any) {
    console.error("Fetch Orders Error:", error);
    throw new AppError("Could not retrieve order history", 500);
  }
}
