import { body, param } from "express-validator";

export const updateRoleRules = [
  param("id").isMongoId(),
  body("role").isIn(["user", "admin"])
];
