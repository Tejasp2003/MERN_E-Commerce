import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getCurrentUser,
  loginUser,
  logoutCurrentUser,
  updateCurrentUser,
    getUserById,
    updateUserById,
    getUserFavorites,
    addProductToFavorites,
    removeProductFromFavorites,
    getUserCart,
    removeProductFromCart,
    addAndUpdateProductToCart
} from "../controllers/userController.js";
import {
  authenticate,
  authorizeAsAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Cart routes
router.route("/cart").post(authenticate, addAndUpdateProductToCart);
router.route("/cart").get(authenticate, getUserCart);
router.route("/cart").delete(authenticate, removeProductFromCart);


// Favorites route
router.route("/favorites").get(authenticate, getUserFavorites);
router.route("/favorites").post(authenticate, addProductToFavorites );
router.route("/favorites").delete(authenticate, removeProductFromFavorites);

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAsAdmin, getAllUsers);
// router.route("/test").post(dummy);
router.route("/auth").post(loginUser);
router.post("/logout", logoutCurrentUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUser)
  .put(authenticate, updateCurrentUser);

router.route("/:id").delete(authenticate, authorizeAsAdmin, deleteUserById)
.get(authenticate, authorizeAsAdmin, getUserById)
.put(authenticate, authorizeAsAdmin, updateUserById)

export default router;
