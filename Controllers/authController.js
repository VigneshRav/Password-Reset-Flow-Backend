import users from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendEmail from "../Utils/mailer.js";

dotenv.config();

//Register or Sign Up

export const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res
        .status(409)
        .json({ message: "The provided email address already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new users({ username, email, password: hashPassword });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User Registered Successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login or Sign In

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();
    res
      .status(200)
      .json({ message: "User Loggedin Successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//forgot password

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await users.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    await sendEmail(
      user.email,
      "Password Reset Link",
      `You have received this email, because you have requested to reset your password. 
      Please click on the following link or copy & paste the link on your browser to reset your password. 
      https://password-reset-flow-reactapp.netlify.app/reset-password/${user._id}/${token} 
      Please kindly ignore this if you have not requested to reset your password.`
    );

    res.status(200).json({
      message: "Verification email sent successfully. Please check your Email",
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const updateUser = await users.findByIdAndUpdate(
      id,
      { password: hashPassword },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "Password Changed Succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
