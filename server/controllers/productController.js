import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category, quantity, brand } = req.fields;
    console.log(req.fields);
   
    if (!name || !price || !description || !category || !quantity || !brand )  {
      return res.status(400).send("Please fill all fields");
    }

    const product = new Product({ ...req.fields })
    product.populate("category")
    console.log("Product: ", product);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, quantity, brand } = req.fields;
    if (!name || !price || !description || !category || !quantity || !brand) {
      return res.status(400).send("Please fill all fields");
    }
    const product = await Product.findByIdAndUpdate(
      id,
      { ...req.fields },
      { new: true } // return the updated product
    );
    product.populate("category")
    console.log("Propduct: ", product);

    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    product.populate("category")
    console.log("Product aapdu: ", product);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category") //populate in mongoose is like join in sql, it will populate the category field with the category object example {_id: 1, name: "Electronics"} instead of just the id of the category
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).send("Product already reviewed");
    }
    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review Added Succefully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});
const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});


export {
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
  fetchProductById,
  getAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
 filterProducts
};
