DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE department(
id INTEGER auto_increment,
department_name VARCHAR(50),

PRIMARY KEY (id)
);

CREATE TABLE role(
id INTEGER auto_increment,
title VARCHAR(50),
salary DECIMAL,
department_id INTEGER,

PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id integer auto_increment,
first_name VARCHAR(50),
last_name VARCHAR(50),
role_id INTEGER,
-- manager_id INTEGER,
 
 PRIMARY KEY (id),
 FOREIGN KEY (role_id) REFERENCES role(id)
-- FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department(department_name)
values ("customer service"), ("real estate agents");

SELECT * FROM department;

INSERT INTO role(title, salary, department_id)
values ("Sales Manager", 45000,1),("Broker Agent", 50000, 2);

SELECT * FROM role;

INSERT INTO employee(first_name,last_name,role_id)
values ("Jennifer", "Mendez", "1"), ("Eduardo", "Mendez", 2);

SELECT * FROM employee;


