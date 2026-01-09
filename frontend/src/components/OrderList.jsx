import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../api/orderApi";
import Pagination from "./Pagination";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [sort, setSort] = useState("created_at");
  const [dir, setDir] = useState("desc");

  useEffect(() => {
    loadOrders();
  }, [page, sort, dir]);

  async function loadOrders() {
    const data = await getOrders({ page, size, sort, dir });
    setOrders(data);
  }

  async function handleChangeStatus(orderId, newStatus) {
  try {
    await updateOrderStatus(orderId, newStatus);
    loadOrders(); // reload list
  } catch (err) {
    alert(err.message); // backend trả lỗi nghiệp vụ
  }
}


  return (
    <div className="card">
      <h2>Danh sách đơn hàng</h2>

      {/* SORT */}
      <div className="controls">
        <select onChange={e => setSort(e.target.value)}>
          <option value="created_at">Ngày tạo</option>
          <option value="total_amount">Tổng tiền</option>
        </select>

        <select onChange={e => setDir(e.target.value)}>
          <option value="desc">Giảm dần</option>
          <option value="asc">Tăng dần</option>
        </select>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.orderCode}</td>
              <td>{o.customerName}</td>
              <td>{Number(o.totalAmount).toLocaleString()} đ</td>
              <td>
  <select
    value={o.status}
    disabled={["COMPLETED", "CANCELED"].includes(o.status)}
    onChange={e => handleChangeStatus(o.id, e.target.value)}
  >
    <option value="NEW">NEW</option>
    <option value="CONFIRMED">CONFIRMED</option>
    <option value="PROCESSING">PROCESSING</option>
    <option value="COMPLETED">COMPLETED</option>
    <option value="CANCELED">CANCELED</option>
  </select>
</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
