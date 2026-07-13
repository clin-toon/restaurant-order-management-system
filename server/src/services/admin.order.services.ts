import pool from "../config/db";
import { AppError } from "../utils/AppError";

export const getTheCustomerOrderDetails = async (
  order_status: string,
  payment_status: string,
  search: string,
  sort: string,
) => {
  let query = `select
 o.id, c.first_name || ' ' || last_name as "full_name" ,
  o.created_at,
  o.order_status,
  o.payment_status 
 from 
    customers c inner join orders o 
    on c.id = o.customer_id `;

  let values = [];
  let conditions = [];

  if (order_status) {
    if (order_status != "all") {
      values.push(order_status);
      conditions.push(` o.order_status = $${values.length} `);
    }
  }

  if (payment_status) {
    if (payment_status != "all") {
      values.push(payment_status);
      conditions.push(` o.payment_status = $${values.length} `);
    }
  }

  if (search) {
    values.push(`%${search}%`);
    conditions.push(`
  (
    o.id::text = $${values.length}
    OR c.first_name ILIKE $${values.length}
  )
`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  if (sort) {
    if (sort === "desc") {
      query += `order by o.created_at desc;`;
    } else if (sort === "asc") {
      query += `order by o.created_at asc;`;
    } else {
      query += `order by o.created_at desc;`;
    }
  }

  const orders = await pool.query(query, values);

  return orders.rows;
};

export const updateOrderStatusService = async (
  orderId: string,
  newStatus: string,
) => {
  try {
    await pool.query("BEGIN");
    const updateQuery = `
      UPDATE orders 
      SET 
        order_status = $1, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 
        AND order_status NOT IN ('delivered', 'cancelled')
      RETURNING id, customer_id, order_status, updated_at;
    `;

    const orderRes = await pool.query(updateQuery, [newStatus, orderId]);

    if (orderRes.rowCount === 0) {
      throw new AppError(
        "Order not found or status cannot be changed (already finalized)",
        400,
      );
    }

    await pool.query("COMMIT");
    return orderRes.rows[0];
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  } finally {
    // pool.release();
  }
};

export const deleteOrderService = async (order_id: string) => {
  const query = `DELETE FROM orders where id = $1 RETURNING id, customer_id, order_status, updated_at;
    `;
  const result = await pool.query(query, [order_id]);
  return result.rows;
};

export const getTheSpecificOrderDetails = async (order_id: string) => {
  const query = `SELECT 
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
WHERE O.id = $1;`;

  try {
    const result = await pool.query(query, [order_id]);
    return result.rows;
  } catch (error: any) {
    console.error("Fetch Orders Error:", error);
    throw new AppError("Could not retrieve order history", 500);
  }
};
