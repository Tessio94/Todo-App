const { z } = require("zod");

const registerSchema = z.object({
	email: z.email(),
	password: z.string().min(6, "Password must be minimum 6 characters long."),
});

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(6, "Password must be minimum 6 characters long."),
});

module.exports = {
	registerSchema,
	loginSchema,
};
