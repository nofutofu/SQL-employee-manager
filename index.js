const inquirer = require('inquirer');
const cTable = require('console.table');

const choices = [
  {
    type: 'list',
    name: 'choices',
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
    switch (response) {
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
      default:
        endProcess();
        break;
    }
  });
}

function viewDepartments() {}

init();
