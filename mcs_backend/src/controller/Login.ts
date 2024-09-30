import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ExecutiveAssistant } from "../types/types";
import { setCache } from "../utils/caching";
import { Cachekeys } from "../Enum/Cachekeys";
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from "../models/airtable";
const router = express.Router();
const UserTable = String(process.env.EXECUTIVEASSISTANT);
// Secret key
const JWT_SECRET = String(process.env.JWT_SECRET);
const JWT_REFRESH_SECRET = String(process.env.JWT_REFRESH_SECRET);

// Login route
router.post("/login", async (req, res) => {
  const { username, password }: ExecutiveAssistant = req.body;

  try {
    // check username
    const user = await getTable(UserTable, `{username} = "${username}"`);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedUser: { [k: string]: any }[] = [];
    user.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      formattedUser.push(plainFields);
    });
    //check password
    const isPasswordValid = await bcrypt.compare(
      password,
      formattedUser[0].password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { username: formattedUser[0].username },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { username: formattedUser[0].username },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const LastLoginTime = new Date().toISOString();

    // // Update last login time
    await updateRecord(UserTable, [
      {
        id: formattedUser[0].id,
        fields: { LastLoginTime, refreshToken },
      },
    ]);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 7 * 1000,
    });

    setCache(Cachekeys.USER, {
      username: formattedUser[0].username,
      LastLoginTime,
      accessToken,
    });

    res.json({
      username: formattedUser[0].username,
      accessToken,
      LastLoginTime,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//refresh token
router.post("/login/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("refreshToken----------------------------",refreshToken)
  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token not provided" });
  }

  try {
    // Verify refresh token
    const user = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    //new access token
    const accessToken = jwt.sign(
      { username: (user as any).username },
      JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ accessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

// Logout route
router.post("/login/logout", async (req, res) => {
  const { username }: ExecutiveAssistant = req.body;
  try {
    const user = await getTable(UserTable, `{username} = "${username}"`);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedUser: { [k: string]: any }[] = [];
    user.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      formattedUser.push(plainFields);
    });
    console.log('formattedUser',formattedUser)
    await updateRecord(UserTable, [
      {
        id: formattedUser[0].id,
        fields: { refreshToken: null },
      },
    ]);

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
