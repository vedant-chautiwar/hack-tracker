import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

const sendUserResponse = (res, statusCode, user) => {
  res.status(statusCode).json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name
    }
  });
};

export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const adminName = process.env.ADMIN_NAME || "admin";

    if (!name || !password) {
      return res.status(400).json({ message: "Please provide name and password" });
    }

    if (name !== adminName) {
      return res.status(401).json({ message: "Invalid name or password" });
    }

    const user = await User.findOne({ name: adminName }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid name or password" });
    }

    sendUserResponse(res, 200, user);
  } catch (error) {
    res.status(500).json({ message: error.message || "Login failed" });
  }
};

export const getMe = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name
    }
  });
};
