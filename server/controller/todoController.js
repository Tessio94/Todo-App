const pool = require("../database");

const getAllTodos = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM todo ORDER BY todo_id ASC;");
		// console.log(result.rows);
		res.json(result.rows);
	} catch (error) {
		res.status(500).send(error);
	}
};

const insertTodo = async (req, res) => {
	const { description, done } = req.body;
	console.log(description, done);

	try {
		const result = await pool.query(
			"INSERT INTO todo (description, done) VALUES ($1, $2) RETURNING *;",
			[description, done]
		);

		res.json(result.rows[0]);
	} catch (error) {}
};

const editDone = async (req, res) => {
	const { id, done } = req.body;
	// console.log(id, done);

	try {
		const result = await pool.query(
			"UPDATE todo SET done = $2 WHERE todo_id = $1 RETURNING *;",
			[id, done]
		);
		// console.log(result.rows[0]);
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
		console.log(result.rows[0]);
		res.json(result.rows[0]);
	} catch (error) {}
};

const deleteTodo = async (req, res) => {
	const { id } = req.body;
	console.log(id);

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
