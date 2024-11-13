import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import db from "../models/index.js";

const User = db.user;

// const addUser = async (req, res) => {
//   const { username, email, password } = req.body;
//   if (!username || !email || !password) {
//     return res
//       .status(400)
//       .json({ error: "Username, email, and password are required." });
//   }
//   const newUser = User.build({
//     username,
//     email,
//     password,
//   });
//   console.log("start");
//   console.log(newUser instanceof User); // true
//   console.log(newUser.username); // Should log the username from the request

//   // Save the user to the database
//   await newUser.save();
//   console.log("NewUser was saved to the database!");
//   console.log(newUser.toJSON());

//   // Return the saved user data
//   res.status(200).json(newUser.toJSON());
// };

// const getUsers = async (req, res) => {
//   const data = await User.findAll({});
//   res.status(200).json({ data: data });
// };

// const getUser = async (req, res) => {
//   const data = await User.findOne({
//     where: {
//       id: req.params.id,
//     },
//   });
//   res.status(200).json({ data: data });
// };

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { register, login };
