import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//Register User:
export const registerUser = async (req, res) => {
  try {
    const { UserName, Email, Password } = req.body;
    const hashPassword = await bcrypt.hash(Password, 10);
    const newUser = new User({ UserName, Email, Password: hashPassword });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login User:
export const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const existingUser = await User.findOne({ Email });
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(Password, existingUser.Password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { _id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    existingUser.Token = token;
    await existingUser.save();
    res
      .status(200)
      .json({ message: "User loggedIn successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
