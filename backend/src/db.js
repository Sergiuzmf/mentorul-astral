const { Pool } = require("pg");
const config = require("./config");

const pool = new Pool({
  connectionString: config.databaseUrl
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL error", error);
});

async function query(text, params) {
  return pool.query(text, params);
}

module.exports = {
  pool,
  query
};
