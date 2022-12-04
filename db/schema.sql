-- recreates the database from fresh
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- creates the department table inside the database
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- creates the role table inside the database
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department_id INT,
    salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

-- creates the employees table inside the database
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
    REFERENCES employee(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);