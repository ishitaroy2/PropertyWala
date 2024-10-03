import express from "express";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Function to get users from the JSON file
const getUsers = () => {
  const usersPath = path.join(__dirname, "../../db/user.json");
  const data = fs.readFileSync(usersPath, "utf-8");
  return JSON.parse(data);
};

// Function to save users back to the JSON file
const saveUsers = (users: any) => {
  const usersPath = path.join(__dirname, "../../db/user.json");
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf-8");
};

// Signup controller
export const signup = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;

  // Read users from the JSON file
  const users = getUsers();

  // Check if user already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user object
  const newUser = {
    id: users.length + 1, // Generate ID (this can be enhanced)
    username,
    password: hashedPassword,
  };

  // Add new user to the list
  users.push(newUser);

  // Save updated user list back to the JSON file
  saveUsers(users);

  res.status(201).json({ msg: "User registered successfully", user: newUser });
};
