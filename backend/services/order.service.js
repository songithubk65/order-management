const pool = require("../db");
const { ORDER_STATUS_FLOW } = require("../utils/orderStatusFlow");
const { toOrderListDTO, toOrderDetailDTO } = require("../dto/order.dto");

async function getOrders({ page = 1, size = 5, sort = "created_at", dir = "desc" }) {
  const offset = (page - 1) * size;

  const result = await pool.query(
    `
    SELECT o.*, c.name AS customer_name
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    ORDER BY ${sort} ${dir}
    LIMIT $1 OFFSET $2
    `,
    [size, offset]
  );

  return result.rows.map(toOrderListDTO);
}

async function createOrder({ customerId, totalAmount }) {
  const orderCode = "ORD-" + Date.now();

  const result = await pool.query(
    `
    INSERT INTO orders(order_code, customer_id, total_amount, status)
    VALUES ($1, $2, $3, 'NEW')
    RETURNING *
    `,
    [orderCode, customerId, totalAmount]
  );

  return result.rows[0];
}

async function changeOrderStatus(orderId, newStatus) {
  const orderRes = await pool.query(
    "SELECT status FROM orders WHERE id = $1",
    [orderId]
  );

  if (orderRes.rows.length === 0) {
    throw new Error("Order not found");
  }

  const currentStatus = orderRes.rows[0].status;

  const allowedNext = ORDER_STATUS_FLOW[currentStatus];

  if (!allowedNext.includes(newStatus)) {
    throw new Error(
      `Invalid status transition: ${currentStatus} → ${newStatus}`
    );
  }

  await pool.query(
    "UPDATE orders SET status = $1 WHERE id = $2",
    [newStatus, orderId]
  );

  return { id: orderId, status: newStatus };
}

async function cancelOrder(orderId) {
  return changeOrderStatus(orderId, "CANCELED");
}

module.exports = {
  getOrders,
  createOrder,
  changeOrderStatus,
  cancelOrder,
};
