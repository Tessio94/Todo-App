const pg = require("pg");
const { Pool } = pg;
require("dotenv").config();

const password = process.env.SIMEPSSW;

const pool = new Pool({
	host: "db1",
	user: "postgres",
	database: "perntodo",
	password: password,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

module.exports = pool;
