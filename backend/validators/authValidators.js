import { body } from "express-validator";

export const registerRules = [
  body("email").isEmail().withMessage("Valid email required"),
  body("username").notEmpty().withMessage("Username required"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 chars")
];

export const loginRules = [
  body("identifier").notEmpty().withMessage("Email or username required"),
  body("password").notEmpty().withMessage("Password required")
];
