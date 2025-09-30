import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Routes from "./routers/userRoutes.js";
import authRoutes from "./routers/authRoutes.js";

const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/user", Routes);
app.use("/api/auth", authRoutes);

app.listen(5000, console.log("App is listening on port 5000"));
