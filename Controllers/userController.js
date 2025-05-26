import User from "../Models/userModel.js";
import bcrypt from "bcrypt";

// Register User:
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
