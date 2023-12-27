import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
import Product from "../models/productModel.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  //   console.log(username, email, password);
  console.log(req.body);
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const user = await newUser.save();
    generateToken(res, user._id);
    res.status(201).json(user);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// const dummy=  asyncHandler(async(req,res)=>{
//   console.log(req.body)
//   res.send("dummy route")
// })

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("req body: ", req.body);
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(400);
    throw new Error("User does not exist");
  }
  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  generateToken(res, existingUser._id);
  res.status(200).json(existingUser);
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0, httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

const updateCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  // console.log(req.body)
  user.username = req.body.username ? req.body.username : user.username;
  user.email = req.body.email ? req.body.email : user.email;
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
  }
  const updatedUser = await user.save();
  generateToken(res, updatedUser._id);
  res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
  });
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  if (user.isAdmin) {
    res.status(400);
    throw new Error("Cannot delete admin user");
  }
  await user.deleteOne({ id: user._id });
  res.status(200).json({ message: "User deleted" });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  console.log(req.body.username);
  user.username = req.body.username ? req.body.username : user.username;
  user.email = req.body.email ? req.body.email : user.email;
  user.isAdmin = req.body.isAdmin ? req.body.isAdmin : user.isAdmin;
  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
});

const addProductToFavorites = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    console.log(user);
    console.log(productId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const isProductInFavorites = await user.favorites.find(
      (favorite) => favorite.toString() === productId.toString()
    );

    if (isProductInFavorites) {
      res.status(400);
      throw new Error("Product already in favorites");
    }
    user.favorites.push(productId);
    await user.save();
    res.status(200).json({ message: "Product added to favorites" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const removeProductFromFavorites = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const isProductInFavorites = await user.favorites.find(
      (favorite) => favorite.toString() === productId.toString()
    );

    if (!isProductInFavorites) {
      res.status(400);
      throw new Error("Product not in favorites");
    }

    user.favorites = user.favorites.filter(
      (favorite) => favorite.toString() != productId.toString()
    );

    await user.save();
    res.status(200).json({ message: "Product removed from favorites" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

const getUserFavorites = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites").exec();
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json(user.favorites);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
  deleteUserById,
  getUserById,
  updateUserById,
  addProductToFavorites,
  removeProductFromFavorites,
  getUserFavorites,
};
