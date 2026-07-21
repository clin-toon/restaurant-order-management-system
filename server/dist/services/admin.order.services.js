"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTheSpecificOrderDetails = exports.deleteOrderService = exports.updateOrderStatusService = exports.getTheCustomerOrderDetails = void 0;
const db_1 = __importDefault(require("../config/db"));
const AppError_1 = require("../utils/AppError");
const getTheCustomerOrderDetails = async (order_status, payment_status, search, sort) => {
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
        }
        else if (sort === "asc") {
            query += `order by o.created_at asc;`;
        }
        else {
            query += `order by o.created_at desc;`;
        }
    }
    const orders = await db_1.default.query(query, values);
    return orders.rows;
};
exports.getTheCustomerOrderDetails = getTheCustomerOrderDetails;
const updateOrderStatusService = async (orderId, newStatus) => {
    try {
        await db_1.default.query("BEGIN");
        const updateQuery = `
      UPDATE orders 
      SET 
        order_status = $1, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 
        AND order_status NOT IN ('delivered', 'cancelled')
      RETURNING id, customer_id, order_status, updated_at;
    `;
        const orderRes = await db_1.default.query(updateQuery, [newStatus, orderId]);
        if (orderRes.rowCount === 0) {
            throw new AppError_1.AppError("Order not found or status cannot be changed (already finalized)", 400);
        }
        await db_1.default.query("COMMIT");
        return orderRes.rows[0];
    }
    catch (error) {
        await db_1.default.query("ROLLBACK");
        throw error;
    }
    finally {
        // pool.release();
    }
};
exports.updateOrderStatusService = updateOrderStatusService;
const deleteOrderService = async (order_id) => {
    const query = `DELETE FROM orders where id = $1 RETURNING id, customer_id, order_status, updated_at;
    `;
    const result = await db_1.default.query(query, [order_id]);
    return result.rows;
};
exports.deleteOrderService = deleteOrderService;
const getTheSpecificOrderDetails = async (order_id) => {
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
        const result = await db_1.default.query(query, [order_id]);
        return result.rows;
    }
    catch (error) {
        console.error("Fetch Orders Error:", error);
        throw new AppError_1.AppError("Could not retrieve order history", 500);
    }
};
exports.getTheSpecificOrderDetails = getTheSpecificOrderDetails;
//# sourceMappingURL=admin.order.services.js.map