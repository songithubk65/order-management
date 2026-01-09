function toOrderListDTO(row) {
  return {
    id: row.id,
    orderCode: row.order_code,
    customerName: row.customer_name,
    totalAmount: row.total_amount,
    status: row.status,
    createdAt: row.created_at,
  };
}
function toOrderDetailDTO(row) {
  return {
    id: row.id,
    orderCode: row.order_code,
    customer: {
      id: row.customer_id,
      name: row.customer_name,
      phone: row.phone,
    },
    totalAmount: row.total_amount,
    status: row.status,
    createdAt: row.created_at,
  };
}

module.exports = { toOrderListDTO, toOrderDetailDTO };
