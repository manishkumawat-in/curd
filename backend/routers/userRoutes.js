import { Router } from "express";
import {
  Add,
  deleteUser,
  getAll,
  update,
} from "../controllers/userController.js";
import { authChecker } from "../middleware/authChecker.js";
import { roleChecker } from "../middleware/roleChecker.js";

const Routes = Router();

Routes.get("/get", authChecker, getAll);
Routes.post("/add", authChecker, roleChecker, Add);
Routes.delete("/delete/:id", authChecker, roleChecker, deleteUser);
Routes.put("/update/:id", authChecker, roleChecker, update);

export default Routes;
