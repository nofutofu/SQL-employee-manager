USE employee_db;

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS 
'department', role.salary, concat(employee.first_name, " ", employee.last_name) AS manager 
FROM employee
RIGHT JOIN role 
ON employee.role_id = role.id
RIGHT JOIN department 
ON role.department_id = department.id;
--  need to figure out how to incorporate manager id