const express = require("express");
const cors = require("cors");

const app = express();
const orderRoutes = require("./routes/order.routes");

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
