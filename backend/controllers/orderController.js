import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//@ desc, CREATE ORDER IN DB, @req Type & route, POST, /api/orders, //@access Public
const addOrderToDB = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
      itemsPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//@fetch single order,  @req Type & route, GET, /api/orders/:id, @access Private
const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

//@ set order tobe paid,  @req Type & route, Get, /api/orders/:id/payment,  @access   Private
const setOrderToBePaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) { 
    order.isPaid = true;
    order.paidAt = Date.now();

    const paidOrder = await order.save();

    res.json(paidOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});


//@ set order tobe out of deliviring,  @req Type & route, PUT, /api/orders/:id/deliver,  @access, Private, admin only
const setOrderToDelivery = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.paidAt = Date.now();

    const deliveredOrder = await order.save();

    res.json(deliveredOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@ get user's orders,  @req Type & route, Get, /api/orders/myorders,  @access   Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

//@ get all orders,  @req Type & route, Get, /api/orders,  @access Private admin only
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ });
  res.json(orders);
});

export { 
  addOrderToDB, 
  getSingleOrder, 
  setOrderToBePaid, 
  getMyOrders, 
  getAllOrders, 
  setOrderToDelivery 
};
