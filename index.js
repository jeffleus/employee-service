'use strict';
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'callsheet-mysql.cn6x6nhayn9c.us-west-2.rds.amazonaws.com',
  user     : 'callsheetadmin',
  password : 'Eraser$17',
  database : 'CallsheetSQL'
});

connection.connect();

connection.query('SELECT * FROM Employees ORDER BY hire_date DESC LIMIT 10', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

connection.end();