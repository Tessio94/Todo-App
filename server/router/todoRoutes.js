const {
	getAllTodos,
	insertTodo,
	editDone,
	editDescription,
	deleteTodo,
} = require("../controller/todoController");

const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");

router.use(auth);

router
	.route("/")
	.get(getAllTodos)
	.post(insertTodo)
	.put(editDone)
	.delete(deleteTodo);
router.route("/edit/:id").put(editDescription);

module.exports = router;
