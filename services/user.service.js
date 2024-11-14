import bcrypt from "bcrypt";

import db from "../models/index.js";

const User = db.User;

export const createUser = async (inputData) => {
  const { username, email, password } = inputData;

  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists with this username!");
  }

  if (!username || !email || !password) {
    throw new Error("All field required!");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return user;
};

export const findUserByEmail = async (email) => {
  return await db.User.findOne({ where: { email } });
};
