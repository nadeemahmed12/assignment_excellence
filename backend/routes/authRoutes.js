import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { registerRules, loginRules } from "../validators/authValidators.js";
import { runValidation } from "../middleware/validate.js";

const router = Router();
router.post("/register", registerRules, runValidation, register);
router.post("/login", loginRules, runValidation, login);
export default router;
