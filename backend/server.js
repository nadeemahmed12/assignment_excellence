import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
connectDb();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";



const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/admin", adminRoutes);


const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("DB connection error:", err.message);
  });
