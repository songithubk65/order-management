const orderService = require("../services/order.service");

exports.getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders(req.query);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const result = await orderService.changeOrderStatus(
      req.params.id,
      req.body.status
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    await orderService.cancelOrder(req.params.id);
    res.json({ message: "Order canceled" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
