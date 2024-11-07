const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "jungle",
  password: "1Fa**XIxlQ-I.sN8",
  database: "jungle",
});

module.exports = con;

// const mysql = require("mysql");

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123456",
//   database: "jungleworks",
// });

// module.exports = con;
