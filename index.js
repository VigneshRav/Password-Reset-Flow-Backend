import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbConfig.js";
import authRouter from "./Routers/userRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to our Backend" });
});

app.use("/api/auth", authRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started and running on port ${port}`);
});
