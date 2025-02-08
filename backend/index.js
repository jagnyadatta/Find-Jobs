import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import otpGenRoute from "./routes/auth.route.js";
import path from "path";

dotenv.config({});
const app = express();
const PORT = process.env.PORT || 3000;

//directory Resolve method
const _dirname = path.resolve();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://find-jobs-bv56.onrender.com",
  credentials: true,
};

// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
// };


app.use(cors(corsOptions));

//API's here
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/otp", otpGenRoute);

//connect to frontend
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

app.listen(PORT, () => {
    connectDB();
  console.log(`App listening on port ${PORT}`);
});
