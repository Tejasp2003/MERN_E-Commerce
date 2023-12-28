import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = Number((itemsPrice * taxRate).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  return {
    itemsPrice: Number(itemsPrice.toFixed(2)),
    shippingPrice: Number(shippingPrice.toFixed(2)),
    taxPrice,
    totalPrice,
  };
}

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  console.log("orderItems", orderItems);

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  // Optimize by querying for all products in a single database query
  const productIds = orderItems.map(item => item.product);
  const products = await Product.find({ _id: { $in: productIds } })
  console.log("products", products);

  if (products.length !== orderItems.length) {
    res.status(400);
    throw new Error("Some products not found");
  }

  const updatedOrderItems = orderItems.map(item => {
    const product = products.find(p => p._id.toString() === item.product);
    if (!product) {
      throw new Error(`Product not found: ${item.product}`);
    }
    return {
      ...item,
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category,

    };
  })

  console.log("updatedOrderItems", updatedOrderItems);

  const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(updatedOrderItems);

  const order = new Order({
    orderItems: updatedOrderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders);
    }
);

const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
    }
);

const getTotalOrdersCount = asyncHandler(async (req, res) => {
    const totalOrdersCount = await Order.countDocuments();
    res.json(totalOrdersCount);
    }
);

const getTotalSalesAmount = asyncHandler(async (req, res) => {
    const totalSalesAmount = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.json(totalSalesAmount.pop().totalSales);
    }
);




export { createOrder, getAllOrders, getUserOrders, getTotalOrdersCount, getTotalSalesAmount};
