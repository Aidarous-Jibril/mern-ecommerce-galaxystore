import express from "express";
const router = express.Router();
import {
  registerUser,
  authUserEmailAndPassword,
  authUserWithGoogle,
  authUserWithFaceBook,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getAUserById,
  updateUser,
  customerContacForm
} from "../controllers/userController.js";

import {
  requireAuth,
  requireAdminAccess,
} from "../middlewares/authMiddleware.js";

router.get("/", requireAuth, requireAdminAccess, getAllUsers); 
router.post("/google", authUserWithGoogle);
router.post("/facebook", authUserWithFaceBook);
router.post("/register", registerUser);
router.post("/login", authUserEmailAndPassword);
router.post("/contact-us", customerContacForm);
router.get("/profile", requireAuth, getUserProfile);
router.put("/profile", requireAuth, updateUserProfile);
router.delete("/:id", requireAuth, requireAdminAccess, deleteUser);
router.get("/:id", requireAuth, requireAdminAccess, getAUserById);
router.put("/:id", requireAuth, requireAdminAccess, updateUser);

export default router;
