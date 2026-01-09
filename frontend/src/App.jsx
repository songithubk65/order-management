import OrderList from "./components/OrderList";
import CreateOrder from "./components/CreateOrder";
import "./styles.css";

export default function App() {
  return (
    <div className="container">
      <CreateOrder onCreated={() => window.location.reload()} />
      <OrderList />
    </div>
  );
}
