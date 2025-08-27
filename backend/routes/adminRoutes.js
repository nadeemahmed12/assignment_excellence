import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { getAllUsers, updateUserRole, getAllTodos } from "../controllers/adminController.js";
import { updateRoleRules } from "../validators/adminValidators.js";
import { runValidation } from "../middleware/validate.js";

const router = Router();
router.use(requireAuth, requireRole("admin"));

router.get("/users", getAllUsers);
router.patch("/users/:id/role", updateRoleRules, runValidation, updateUserRole);
router.get("/todos", getAllTodos);

export default router;
