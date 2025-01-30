import express from "express";
import {
  getUser,
  registerUser,
  updateUser,
  userLogin,
} from "../controllers/userController.js";
const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", userLogin);
userRoute.put("/update", updateUser);
userRoute.get("/", getUser);

export default userRoute;
