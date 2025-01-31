import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import fs from "fs";
const registerUser = async (req, res, next) => {
  try {
    const { role, email, password, name } = req.body;
    if (!email || !password || !name)
      return res.json({
        success: false,
        message: "Please Enter All Fields",
      });
    const profileImage = `${req.file.filename}`;
    if (!profileImage)
      return res.json({
        success: false,
        message: "please upload profileImage",
      });
    const user = await userModel.findOne({ email });
    if (user)
      return res.status(400).json({
        success: false,
        message: "user allready registerd",
      });
    const newUser = await userModel.create({
      name,
      email,
      role,
      password,
      profileImage,
    });
    await newUser.save();
    const token = JWT.sign({ name, email }, process.env.JWT_SECRET);
    res.status(201).json({
      success: true,
      message: "User Registration done",
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error while user registration",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      email: email,
    });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "user not find for these email",
      });
    const ComparedPass = await bcrypt.compare(password, user.password);
    if (!ComparedPass)
      return res.status(400).json({
        success: false,
        message: "Password incorrect",
      });

    const name = user.name;
    const token = JWT.sign({ name, email }, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      message: "user Login Succesfully",
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error in Login API",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Error while geting user profile");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, role, password, email, name } = req.body;
    const user = await userModel.findById(id);
    if (!user)
      return res.json({
        success: false,
        message: "user not found for these id",
      });
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    if (role) {
      user.role = role;
    }
    const updateduser = await user.save();
    res.status(201).json({
      success: true,
      updateduser,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "error in update user API",
    });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.body;
    const profileImage = `${req.file.filename}`;
    const user = await userModel.findById(id);
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not fount for these ID",
      });
    if (!profileImage)
      return res.json({
        success: false,
        message: "please upload new image",
      });
    fs.unlink("uploads/" + user.profileImage, async () => {
      console.log("image deleted");
    });
    if (profileImage) {
      user.profileImage = profileImage;
      console.log("profileImage updated succesfully");
    }
    await user.save();
    return res.status(201).json({
      success: true,
      message: "profile updated succesfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: `error in update user profile :  ${error.message}`,
    });
  }
};
export { registerUser, userLogin, getUser, updateUser, updateUserProfile };
