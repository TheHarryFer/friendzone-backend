const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host : dbConfig.HOST,
  user : dbConfig.USER,
  password : dbConfig.PASSWORD,
  database : dbConfig.DB
});


// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the " + dbConfig.DB + " database.");
  connection.query("CREATE TABLE IF NOT EXISTS User(user_id VARCHAR(8) NOT NULL, username VARCHAR(16) NOT NULL, password VARCHAR(64) NOT NULL, email VARCHAR(64) NOT NULL, firstname VARCHAR(64) NOT NULL, lastname VARCHAR(64) NOT NULL, birthdate VARCHAR(8) NOT NULL, gender_id VARCHAR(6) NOT NULL, phone VARCHAR(10) NOT NULL, profile_pic VARCHAR(128) NOT NULL, bio VARCHAR(150), role_id VARCHAR(4) NOT NULL, status_id VARCHAR(4) NOT NULL, created_at BIGINT NOT NULL, updated_at BIGINT NOT NULL);");
});

module.exports = connection;