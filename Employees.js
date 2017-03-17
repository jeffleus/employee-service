'use strict';
var Sequelize = require('sequelize');
var sequelize = new Sequelize('CallsheetSQL', 'callsheetadmin', 'Eraser$17', {
	host: 'callsheet-mysql.cn6x6nhayn9c.us-west-2.rds.amazonaws.com',
	port: 3306,
    pool: {
        max: 10,
        min: 1,
        idle: 100
    }
});

var Employee = sequelize.define('employee', {
  firstName: { type: Sequelize.STRING, field: 'emp_first' }, 
  lastName: { type: Sequelize.STRING, field: 'emp_last' }, 
  startDate: { type: Sequelize.DATE, field: 'hire_date' }
});

module.exports.get = function(id) {
    if (!id) return _getAll();
    console.log('EMP: calling getSingle with id: ' + id);
    return sequelize.sync().then(function() {
        return Employee.findById(id).then(function(employee) {
            console.info('EMP: employee record found');
            return {
                count: 1,
                employees: [ employee.dataValues ]
            };
        })
    });
}

function _getAll() {
    console.log('EMP: calling getAll because no id provided');
	return sequelize.sync().then(function() {
		return Employee.findAndCountAll().then(function(result) {
			var employees = [];
			result.rows.forEach(function(employeeRow) {
				employees.push(employeeRow.dataValues);
			});
			return {
				count: result.count,
				employees: employees
			};
		});
	});
}