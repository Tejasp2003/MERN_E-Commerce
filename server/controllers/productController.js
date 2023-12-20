import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category, quantity, brand } = req.fields;
    // console.log(req.fields);
    if (!name || !price || !description || !category || !quantity || !brand) {
      return res.status(400).send("Please fill all fields");
    }

    const product = new Product({ ...req.fields });
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
        res.status(200).send("Product deleted");
        
    } catch (error) {

        console.log(error);
        res.status(500).send("Internal server error");
    }
})

const fetchProducts = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6;
        const keyword= req.query.keyword ? 
        {name: {$regex: req.query.keyword, $options: 'i'}} : {};

        const count = await Product.countDocuments({...keyword});
        const products = await Product.find({...keyword}).limit(pageSize);

        res.json({
            products,
            page: 1,
            pages: Math.ceil(count / pageSize),
            hasMore: false
        

        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

const fetchProductById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

const  getAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
        .populate("category") //populate in mongoose is like join in sql, it will populate the category field with the category object example {_id: 1, name: "Electronics"} instead of just the id of the category
        .limit(12)
        .sort({createdAt: -1})
        res.status(200).send(products);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
        
    }
})

export { addProduct, updateProduct, deleteProduct, fetchProducts, fetchProductById, getAllProducts};
