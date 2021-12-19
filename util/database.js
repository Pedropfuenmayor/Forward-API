const Pool = require('pg').Pool;
const pool = new Pool({
  user: "new",
  host: "",
  database: "",
  password: "",
  port: 5432,
});

module.exports = pool