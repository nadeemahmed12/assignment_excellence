import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(409).json({ message: "Email or username already exists" });

    const user = await User.create({ email, username, password });
    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, email, username, role: user.role } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;
    const query = identifier.includes("@") ? { email: identifier } : { username: identifier };
    const user = await User.findOne(query).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = signToken(user);
    res.json({ token, user: { id: user._id, email: user.email, username: user.username, role: user.role } });
  } catch (err) {
    next(err);
  }
};
