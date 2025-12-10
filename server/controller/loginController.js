const pool = require("../database");

const register = async (req, res) => {
	const { email, password } = req.body;

	const hash = await bcrypt.hash(password, 10);

	const result = await pool.query(
		"INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING user_id, email;",
		[email, hash]
	);

	res.json(result.rows[0]);
};

const login = async (req, res) => {
	const { email, password } = req.body;

	const result = await pool.query("SELECT * FROM users WHERE email = $1;", [
		email,
	]);

	if (result.rows.length === 0)
		return res.status(400).json({ error: "Invalid credentials" });

	const user = result.rows[0];
	const match = await bcrypt.compare(password, user.password_hash);

	if (!match) return res.status(400).json({ error: "Invalid credentials" });

	const token = jwt.sign(
		{ user_id: user.user_id, email: user.email },
		process.env.JWT_SECRET,
		{ expiresIn: "2h" }
	);

	res.cookie("auth_token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	res.json({ message: "Login successful." });
};

const logout = async (req, res) => {
	res.clearCookie("auth_token");
	res.json({ message: "Logged out." });
};

module.exports = { register, login, logout };
