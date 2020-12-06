import express from "express";
const router = express.Router();
import {
  registerUser,
  authenticateUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from "../controllers/userController.js";

import {
  requireAuth,
  requireAdminAccess,
} from "../middlewares/authMiddleware.js";

router.get("/", requireAuth, requireAdminAccess, getAllUsers);
router.post("/register", registerUser);
router.post("/login", authenticateUser);
router.get("/profile", requireAuth, getUserProfile);
router.put("/profile", requireAuth, updateUserProfile);
// router.route('/profile').get( requireAuth, getUserProfile) ;

export default router;
