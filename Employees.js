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

module.exports.create = function(json) {
	return sequelize.sync().then(function() {
		console.info('EMP: create a new employee using JSON provided');
		console.error('need to add json validation to employee creation');
		return Employee.create(json).then(function(employee) {
			console.info('employee successfully created');
			return employee;
		});
	});
};

module.exports.update = function(id, json) {
	return sequelize.sync().then(function() {
		console.info('EMP: update a single employee using JSON provided');
		console.error('need to add json validation to employee update');
		return Employee.update(
			json,
			{ where: { id: json.id } }
		).then(function(result) {
			console.info('EMP: employee successfully updated');
			return result;
		});
	});
};

module.exports.delete = function(id) {
	return sequelize.sync().then(function() {
		console.info('EMP: delete an employee by id');
		return Employee.destroy({ where: { id: id } }).then(function(count) {
			console.info('EMP: ' + count.toString() + ' employees successfully deleted');
			return count;
		});
	});
};

module.exports.close = function() {
	sequelize.close();
};