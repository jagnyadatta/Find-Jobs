import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http//localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// app.get("/home", (req, res) => {
//   return res.status(200).json({
//     message: "I am came from backend",
//     success: true,
//   });
// });

app.listen(PORT, () => {
    connectDB();
  console.log(`App listening on port ${PORT}`);
});