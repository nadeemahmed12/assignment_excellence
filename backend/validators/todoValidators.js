import { body } from "express-validator";

export const createTodoRules = [
  body("title").notEmpty().isLength({ max: 100 }).withMessage("Title required (max 100 chars)"),
  body("description").optional().isLength({ max: 500 }),
  body("dueDate").optional().isISO8601().toDate(),
  body("category").optional().isIn(["Urgent", "Non-Urgent"])
];

export const updateTodoRules = [
  body("title").optional().isLength({ max: 100 }),
  body("description").optional().isLength({ max: 500 }),
  body("dueDate").optional().isISO8601().toDate(),
  body("category").optional().isIn(["Urgent", "Non-Urgent"])
];
