import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// Function to read the user data from the JSON file
const getUsers = () => {
  const usersPath = path.join(__dirname, "../../db/user.json");
  const data = fs.readFileSync(usersPath, "utf-8");
  return JSON.parse(data);
};

// Login function
export const login = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;

  // Read users from JSON file
  const users = getUsers();
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(400).json({ msg: "No User Found" });
  }

  // Compare password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  // Prepare JWT payload
  const payload = {
    user: {
      id: user.id,
      username: user.username,
    },
  };

  // Sign and send JWT token
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 36000 },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};
