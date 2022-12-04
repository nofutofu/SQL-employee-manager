const inquirer = require('inquirer');
require('console.table');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db',
  },
  console.log(`Connected to employee_db database.`),
);

const choices = [
  {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      "Update an Employee's Role",
      'End Employee Management',
    ],
  },
];

function init() {
  inquirer.prompt(choices).then(response => {
    switch (response.choice) {
      case 'View All Departments':
        viewDepartments();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case "Update an Employee's Role":
        updateEmployee();
        break;
      case 'End Employee Management':
        endProcess();
        break;
    }
  });
}

function viewDepartments() {
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err);
      init();
    }
    console.table(results);
    init();
  });
}

function viewRoles() {
  db.query(`SELECT * FROM role`, function (err, results) {
    if (err) {
      console.log(err);
      init();
    }
    console.table(results);
    init();
  });
}

function viewEmployees() {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS 
    'department', role.salary, concat(employee.first_name, " ", employee.last_name) AS manager 
    FROM employee
    RIGHT JOIN role 
    ON employee.role_id = role.id
    RIGHT JOIN department 
    ON role.department_id = department.id;`,
    // need to add manager functionality
    function (err, results) {
      if (err) {
        console.log(err);
        init();
      }
      console.table(results);
      init();
    },
  );
}

const addDepartment = async () => {
  const newDep = await inquirer.prompt({
    type: 'input',
    name: 'department',
    message: 'Enter department name you wish to add.',
  });
  await db.promise().query(
    `INSERT INTO department (name) VALUES (?)`,
    newDep.department,
    (err, result) => {
      if (err) {
        console.log(err);
        init();
      }
    },
    viewDepartments(),
  );
};

const addRole = async () => {
  const choiceDep = await db
    .promise()
    .query(`SELECT id AS value, name AS name FROM department`);
  const newRole = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter role name you wish to add.',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary of the role.',
    },
    {
      type: 'list',
      name: 'department',
      message: 'Which department is this role in?',
      choices: choiceDep[0],
    },
  ]);
  await db
    .promise()
    .query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [
      newRole.title,
      newRole.salary,
      newRole.department,
    ]);
  viewRoles();
};

function addEmployee() {}

function updateEmployee() {}

function endProcess() {
  console.log('Goodbye.');
  process.exit();
}

init();
