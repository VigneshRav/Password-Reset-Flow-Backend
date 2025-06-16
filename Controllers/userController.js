import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendEmail from "../Utils/mailer.js";

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

//Forgot Password:
export const forgotPassword = async (req, res) => {
  try {
    const { Email } = req.body;
    const user = await User.findOne({ Email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    await sendEmail(
      user.Email,
      "Password Reset Link",
      `You have received this email, because you have requested to reset your password. 
      Please click on the following link or copy & paste the link on your browser to reset your password. 
      https://userauth123.netlify.app/forgot-password/${user._id}/${token}
      Please kindly ignore this if you have not requested to reset your password.`
    );

    res.status(200).json({
      message: "Verification email sent successfully. Please check your inbox",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    //token verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    //hash the new password
    const hashPassword = await bcrypt.hash(password, 10);

    //update the user's new password in the database
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "Password Resetted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
