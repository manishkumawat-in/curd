import { Router } from "express";
import { isLoggedIn, login, signUp } from "../controllers/authController.js";
import { authChecker } from "../middleware/authChecker.js";
import {validate} from "../middleware/validate.js";
import { loginSchema, signUpSchema } from "../validators/authSchema.js";

const authRoutes = Router();

authRoutes.post("/signup", validate(signUpSchema), signUp);
authRoutes.post("/login", validate(loginSchema), login);
authRoutes.get("/isloggedin", authChecker, isLoggedIn);

export default authRoutes;
