const pg = require("pg");
const { Pool } = pg;
require("dotenv").config();

// const password = process.env.SIMEPSSW;

// const pool = new Pool({
// 	host: "localhost",
// 	user: "postgres",
// 	database: "perntodo",
// 	password: password,
// 	max: 20,
// 	idleTimeoutMillis: 30000,
// 	connectionTimeoutMillis: 2000,
// });

const password = process.env.DATABASE_URL_PROD;

const pool = new Pool({
	connectionString: password,
	ssl: {
		rejectUnauthorized: false,
	},
});

module.exports = pool;
