import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todoController.js";
import { createTodoRules, updateTodoRules } from "../validators/todoValidators.js";
import { runValidation } from "../middleware/validate.js";

const router = Router();
router.use(requireAuth);

router.get("/", listTodos);
router.post("/", createTodoRules, runValidation, createTodo);
router.put("/:id", updateTodoRules, runValidation, updateTodo);
router.delete("/:id", deleteTodo);

export default router;
