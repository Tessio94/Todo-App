const pool = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { registerSchema, loginSchema } = require("../validation/schema");

const register = async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const { email, password } = data;

    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING user_id, email;",
      [email, hash]
    );

    res.json(result.rows[0]);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const typeError = z.flattenError(err).fieldErrors;
      const messages = Object.values(typeError).map((mess) => mess[0]);

      return res.status(400).json({
        error: messages,
      });
    }

    return res.status(400).json({
      error: "User with those credentials already exists",
    });
  }
};

const login = async (req, res) => {
  console.log("reqqq");
  try {
    const data = loginSchema.parse(req.body);
    console.log("dataaa", data);
    const { email: reqEmail, password } = data;

    const result = await pool.query("SELECT * FROM users WHERE email = $1;", [
      reqEmail,
    ]);

    if (result.rows.length === 0)
      return res.status(400).json({ error: "Invalid credentials" });

    const { user_id, email, password_hash } = result.rows[0];
    const match = await bcrypt.compare(password, password_hash);

    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ user_id, email }, process.env.JWT_SECRET_TODO, {
      expiresIn: "2h",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ user: { id: user_id, email }, message: "Login successful." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      const typeError = z.flattenError(err).fieldErrors;
      const messages = Object.values(typeError).map((mess) => mess[0]);

      return res.status(400).json({
        error: messages,
      });
    }
    console.log("errorrr", err);
  }
};

const logout = async (req, res) => {
  res.clearCookie("auth_token");
  res.json({ message: "Logged out." });
};

const getCurrentUser = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(400).json({ error: "User email not provided" });
    }

    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.user.user_id,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      id: user.rows[0].user_id,
      email: user.rows[0].email,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login, logout, getCurrentUser };
