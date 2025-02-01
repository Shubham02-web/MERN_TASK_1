import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token)
      return res.status(400).json({
        success: false,
        message: "token not found",
      });
    const decodeToken = await JWT.verify(token, process.env.JWT_SECRET);
    req.body.id = decodeToken.id;
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in auth user API Token" + error.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user)
      return res.status(400).json({
        success: false,
        message: "user id not found or invalid",
      });
    if (user.role === "admin") {
      return next();
    } else {
      return res.json({
        success: false,
        message: "you are not admin",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error in isAdmin API" + error.message,
    });
  }
};

export { authUser, isAdmin };
