import User from "../models/User.js";
import Todo from "../models/Todo.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().populate("user", "username email role");
    res.json(todos);
  } catch (err) {
    next(err);
  }
};
