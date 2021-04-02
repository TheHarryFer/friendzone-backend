const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
const fs = require("fs");

// Create a connection to the database
const connection = mysql.createConnection({
  host : dbConfig.HOST,
  user : dbConfig.USER,
  password : dbConfig.PASSWORD,
  database : dbConfig.DB
});


// open the MySQL connection
connection.connect(error => {
  if (error)
    throw error;

  console.log("Successfully connected to the " + dbConfig.DB + " database.");
  
  var tables = fs.readFileSync('./app/sql/tables.sql').toString();
  connection.query(tables);
});

module.exports = connection;