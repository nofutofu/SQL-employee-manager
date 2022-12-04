USE employee_db;

-- seeded data for example for department table
INSERT INTO department (id, name)
VALUES (1, 'Human Resources'),
       (2, 'Sales'),
       (3, 'Warehouse'),
       (4, 'Finance');

-- seeded data for example for role table
INSERT INTO role (id, title, salary, department_id)
VALUES (51, 'Forklift Driver', 80000, 3),
       (52, 'Accountant', 120000, 4),
       (53, 'Salesperson', 85000, 2),
       (54, 'HR Analyst', 75000, 1),
       (55, 'Warehouse Manager', 100000, 3),
       (56, 'Securities Trader', 115000, 4),
       (57, 'HR Specialist', 95000, 1),
       (58, 'Sales Representetive', 90000, 2);

-- seeded data for example for employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (101, 'Killian', 'Simmons', 53, 105),
       (102, 'Juliana', 'Patterson', 52, 105),
       (103, 'Beau', 'Hamilton', 56, NULL),
       (104, 'Jayce', 'Wallace', 57, 102),
       (105, 'Elia', 'Griffin', 51, 103),
       (106, 'Peter', 'Bryant', 54, 102),
       (107, 'Ronan', 'Hayes', 57, 108),
       (108, 'Beckett', 'Medina', 52, 103),
       (109, 'Cooper', 'Gibson', 54, 105),
       (110, 'Sylvia', 'Herrera', 53, 108),
       (111, 'Davina', 'Tran', 58, 108),
       (112, 'Dillon', 'Castro', 51, 108),
       (113, 'Ana', 'Ford', 55, 105);