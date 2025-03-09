const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
    process.exit(1);
  } else {
    console.log("✅ MySQL Connected!");
  }
});

module.exports = connection;
