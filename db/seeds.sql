INSERT INTO department (id, name)
VALUES (1, 'Human Resources'),
       (2, 'Sales'),
       (3, 'Warehouse'),
       (4, 'Finance');

INSERT INTO role (id, title, salary, department_id)
VALUES (51, 'Forklift Driver', 80000, 3),
       (52, 'Accountant', 120000, 4),
       (53, 'Salesperson', 75000, 2),
       (54, 'HR Analyst', 75000, 1),
       (55, 'Warehouse Manager', 100000, 3),
       (56, 'Securities Trader', 115000, 4),
       (57, 'HR Specialist', 95000, 1),
       (58, 'Sales Representetive', 90000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Killian', 'Simmons', 53, 101),
       ('Juliana', 'Patterson', 52, NULL),
       ('Beau', 'Hamilton', 56, NULL),
       ('Jayce', 'Wallace', 57, NULL),
       ('Elia', 'Griffin', 51, 103),
       ('Peter', 'Bryant', 54, NULL),
       ('Ronan', 'Hayes', 57, NULL),
       ('Beckett', 'Medina', 52, NULL),
       ('Cooper', 'Gibson', 54, 102),
       ('Sylvia', 'Herrera', 53, NULL),
       ('Davina', 'Tran', 58, 104),
       ('Dillon', 'Castro', 51, NULL),
       ('Ana', 'Ford', 55, 105);