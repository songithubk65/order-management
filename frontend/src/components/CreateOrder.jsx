import { useState } from "react";
import { createOrder } from "../api/orderApi";

export default function CreateOrder({ onCreated }) {
  const [customerId, setCustomerId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await createOrder({
      customerId: Number(customerId),
      totalAmount: Number(totalAmount),
    });
    setCustomerId("");
    setTotalAmount("");
    onCreated();
  }

  return (
    <div className="card">
      <h2>Tạo đơn hàng</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Customer ID"
          value={customerId}
          onChange={e => setCustomerId(e.target.value)}
          required
        />
        <input
          placeholder="Total Amount"
          value={totalAmount}
          onChange={e => setTotalAmount(e.target.value)}
          required
        />
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
}
