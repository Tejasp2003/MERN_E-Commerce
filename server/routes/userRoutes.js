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
    updateUserById
} from "../controllers/userController.js";
import {
  authenticate,
  authorizeAsAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();
1;

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
