'use strict';
var mysql = require('mysql');
var SMS = require('./SMS');
const AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var sns = new AWS.SNS();

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
	
  var connection = mysql.createConnection({
  host     : 'callsheet-mysql.cn6x6nhayn9c.us-west-2.rds.amazonaws.com',
  user     : 'callsheetadmin',
  password : 'Eraser$17',
  database : 'CallsheetSQL'
});

connection.connect();

connection.query('SELECT count(*) AS EmpCount FROM Employees', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].EmpCount);
});

connection.end();

SMS.sendText('YO, dis a text from Lambda!', '+13108771151').then(function(data) {
		console.log(data);
		callback(null, response);
	});	
};