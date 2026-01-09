const BASE_URL = "http://localhost:5000/api/orders";

export async function getOrders({ page, size, sort, dir }) {
  const url = `${BASE_URL}?page=${page}&size=${size}&sort=${sort}&dir=${dir}`;
  const res = await fetch(url);
  return res.json();
}

export async function createOrder(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateOrderStatus(orderId, status) {
  const res = await fetch(
    `http://localhost:5000/api/orders/${orderId}/status`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
}
