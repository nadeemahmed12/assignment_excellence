import Todo from "../models/Todo.js";

export const listTodos = async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? {} : { user: req.user.id };
    const todos = await Todo.find(filter).populate("user", "username email role");
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

export const createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create({ ...req.body, user: req.user.id });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Not found" });

    if (req.user.role !== "admin" && String(todo.user) !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    Object.assign(todo, req.body);
    await todo.save();
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Not found" });

    if (req.user.role !== "admin" && String(todo.user) !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await todo.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
