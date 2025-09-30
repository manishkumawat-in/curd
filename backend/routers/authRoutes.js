import { Router } from "express";
import { isLoggedIn, login, signUp } from "../controllers/authController.js";
import { authChecker } from "../middleware/authChecker.js";

const authRoutes = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.get("/isloggedin", authChecker, isLoggedIn);

export default authRoutes;
