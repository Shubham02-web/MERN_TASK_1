import express from "express";
import {
  getUser,
  getUsers,
  registerUser,
  removeUser,
  updateUser,
  updateUserProfile,
  userLogin,
} from "../controllers/userController.js";
import { upload } from "../middleware/middleware.js";
import { authUser, isAdmin } from "../middleware/auth.js";
const userRoute = express.Router();

userRoute.post("/register", upload.single("profileImage"), registerUser);
userRoute.post("/login", userLogin);
userRoute.put("/update", authUser, updateUser);
userRoute.put(
  "/update/profile",
  upload.single("profileImage"),
  authUser,
  updateUserProfile
);
userRoute.get("/single", authUser, getUser);
userRoute.get("/", authUser, isAdmin, getUsers);
userRoute.delete("/remove", authUser, removeUser);
export default userRoute;
