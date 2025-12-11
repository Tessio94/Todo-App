const pool = require("../database");

const getAllTodos = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM todo ORDER BY todo_id ASC;");

		res.json(result.rows);
	} catch (error) {
		res.status(500).send(error);
	}
};

const insertTodo = async (req, res) => {
	const { description, done, user_id } = req.body;

	try {
		const result = await pool.query(
			"INSERT INTO todo (description, done, user_id) VALUES ($1, $2, $3) RETURNING *;",
			[description, done, user_id]
		);

		res.json(result.rows[0]);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Failed to insert todo" });
	}
};

const editDone = async (req, res) => {
	const { id, done } = req.body;

	try {
		const result = await pool.query(
			"UPDATE todo SET done = $2 WHERE todo_id = $1 RETURNING *;",
			[id, done]
		);

		res.json(result.rows[0]);
	} catch (error) {}
};

const editDescription = async (req, res) => {
	const { id } = req.params;
	const { description } = req.body;

	try {
		const result = await pool.query(
			"UPDATE todo SET description = $2 WHERE todo_id = $1 RETURNING *;",
			[id, description]
		);

		res.json(result.rows[0]);
	} catch (error) {}
};

const deleteTodo = async (req, res) => {
	const { id } = req.body;

	try {
		const result = await pool.query(
			"DELETE from todo WHERE todo_id = $1 RETURNING *;",
			[id]
		);

		res.json(result.rows[0]);
	} catch (error) {}
};

module.exports = {
	getAllTodos,
	insertTodo,
	editDone,
	editDescription,
	deleteTodo,
};
