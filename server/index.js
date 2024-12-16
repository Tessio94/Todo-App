const express = require("express");
const app = express();
const pool = require("./database.js");

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todo ORDER BY todo_id ASC;");
    // console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/", async (req, res) => {
  const { description, done } = req.body;
  console.log(description, done);

  try {
    const result = await pool.query(
      "INSERT INTO todo (description, done) VALUES ($1, $2) RETURNING *;",
      [description, done]
    );

    res.json(result.rows[0]);
  } catch (error) {}
});

app.put("/", async (req, res) => {
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
});

app.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  // console.log(id, description);

  try {
    const result = await pool.query(
      "UPDATE todo SET description = $2 WHERE todo_id = $1 RETURNING *;",
      [id, description]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {}
});

app.delete("/", async (req, res) => {
  const { id } = req.body;
  console.log(id);

  try {
    const result = await pool.query(
      "DELETE from todo WHERE todo_id = $1 RETURNING *;",
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {}
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
