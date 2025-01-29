import express from "express";
import {
  getUser,
  registerUser,
  userLogin,
} from "../controllers/userController.js";
const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", userLogin);
userRoute.get("/", getUser);

export default userRoute;
