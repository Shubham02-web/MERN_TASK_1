import express from "express";
import {
  getUser,
  registerUser,
  updateUser,
  updateUserProfile,
  userLogin,
} from "../controllers/userController.js";
import { upload } from "../middleware/middleware.js";
const userRoute = express.Router();

userRoute.post("/register", upload.single("profileImage"), registerUser);
userRoute.post("/login", userLogin);
userRoute.put("/update", updateUser);
userRoute.put(
  "/update/profile",
  upload.single("profileImage"),
  updateUserProfile
);
userRoute.get("/", getUser);

export default userRoute;
