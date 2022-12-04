const inquirer = require('inquirer');
require('console.table');
const mysql = require('mysql2');

// sets up a connection to the mysql database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db',
  },
  console.log(`Connected to employee_db database.`),
);

// menu commands for the user to pick from
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

// starts off the terminal menu by providing the commands and routing to each responding function depending on the choice
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

// views all departments in the database
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

// views all roles along with salary in the database
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

// views all employees in the database displaying their id, names, roles, departments, salaries, and managers if they have one
function viewEmployees() {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS 
    department, role.salary, concat(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role 
        ON employee.role_id = role.id
        RIGHT JOIN department 
        ON role.department_id = department.id
        LEFT JOIN employee manager 
        ON manager.id = employee.manager_id;`,

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

// adds a new department to the database
const addDepartment = async () => {
  const newDep = await inquirer.prompt({
    type: 'input',
    name: 'department',
    message: 'Enter department name you wish to add.',
  });
  await db
    .promise()
    .query(`INSERT INTO department (name) VALUES (?)`, [newDep.department]);
  viewDepartments();
};

// adds a new role & salary to the database
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

// adds a new employee to the database along with their name, role and manager
const addEmployee = async () => {
  const choiceRole = await db
    .promise()
    .query(`SELECT id AS value, title AS name FROM role`);
  const choiceManager = await db
    .promise()
    .query(
      `SELECT id AS value, concat(first_name, " ", last_name) AS name FROM employee`,
    );
  const newEmp = await inquirer.prompt([
    {
      type: 'input',
      name: 'first',
      message: 'Enter the first name of the employee.',
    },
    {
      type: 'input',
      name: 'last',
      message: 'Enter the last name of the employee.',
    },
    {
      type: 'list',
      name: 'role',
      message: 'Choose the role of the employee.',
      choices: choiceRole[0],
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Choose the manager of the employee if applicable',
      choices: choiceManager[0],
    },
  ]);
  await db
    .promise()
    .query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
      [newEmp.first, newEmp.last, newEmp.role, newEmp.manager],
    );
  viewEmployees();
};

// updates an employee allowing for the changing of their role
const updateEmployee = async () => {
  const choiceRole = await db
    .promise()
    .query(`SELECT id AS value, title AS name FROM role`);
  const choiceEmp = await db
    .promise()
    .query(
      `SELECT id AS value, concat(first_name, " ", last_name) AS name FROM employee`,
    );
  const updateEmp = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Choose which employee you wish to update',
      choices: choiceEmp[0],
    },
    {
      type: 'list',
      name: 'role',
      message: 'Choose which role you wish to give to this employee',
      choices: choiceRole[0],
    },
  ]);
  await db
    .promise()
    .query(`UPDATE employee SET role_id = ? WHERE id = ?`, [
      updateEmp.role,
      updateEmp.employee,
    ]);
  viewEmployees();
};

// kills the terminal process and stops the program
function endProcess() {
  console.log('Goodbye.');
  process.exit();
}

init();
