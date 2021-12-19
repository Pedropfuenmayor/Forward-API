const Pool = require('pg').Pool;
const pool = new Pool({
  user: "pepetrueno",
  host: "",
  database: "",
  password: "",
  port: 5432,
});

module.exports = pool