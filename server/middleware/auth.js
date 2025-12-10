const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	const token = req.cookies.auth_token;
	if (!token) return res.status(401).json({ error: "Not authenticated" });

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (error) {
		return res.status(403).json({ error: "Invalid token" });
	}
}

module.exports = {
	auth,
};
