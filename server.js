const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Joel0606#",
  database: "employeeTracker_db",
});

connection.connect((err) => {
  if (err) {
    console.error("error");
    connection.end();
  } else {
    askFirstQuestion();
  }
});

function askFirstQuestion() {
  // const userQuestions = [];
  inquirer
    .prompt([
      {
        type: "list",
        message: "what would you like to do?",
        name: "choice",
        choices: [
          "add department",
          "add roles",
          "add employees",
          "view departments",
          "view roles",
          "view employees",
          "update employee roles",
          "exit",
        ],
      },
    ])
    .then((responses) => {
      //console.log(responses);
      const { choice } = responses;
      if (choice === "add department") {
        add_department();
      } else if (choice === "add roles") {
        addRoles();
      } else if (choice === "add employees") {
        addEmployees();
      } else if (choice === "view departments") {
        viewDepartments();
      } else if (choice === "view roles") {
        viewRoles();
      } else if (choice === "view employees") {
        viewEmployees();
      } else if (choice === "update employee roles") {
        updateEmployeesRoles();
      } else {
        connection.end();
        console.log("see you next time");
      }
    });
}
// if use chose add a department
// create a function to prompt the user the name of new dpt
function add_department() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new department name?",
        name: "department_name",
      },
    ])
    .then((responses) => {
      console.log(responses);
      insertDpt(responses);
    });
}

function insertDpt(data) {
  connection.query("INSERT INTO department SET ?", data, (err) => {
    if (err) return console.error(err);
    console.log("your department has been created");
    //console.log(data);
    askFirstQuestion();
  });
}
// ADDING A NEW ROLE
function addRoles() {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) console.error(err);
    console.log(results);
    prompt_Roles(results);
  });
}

function prompt_Roles(results) {
  let allDepartments = results.map((department) => {
    return { name: department.department_name, value: department.id };
  });
  console.log("aqui estan todos los departments");
  console.log(allDepartments);
  {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the new title?",
          name: "title",
        },
        {
          type: "input",
          message: "add new salary",
          name: "salary",
        },

        {
          type: "list",
          message: "what is the department ID",
          name: "department_id",
          choices: allDepartments
        },
      ])
      .then((responses) => {
        // console.log(responses);
        insertRole(responses);
      });
  }
}
function insertRole(data) {
  connection.query('INSERT INTO role SET ?', data, (err) => {
    if (err) return console.error(err);
    console.log(data);
    console.log("role added");
    askFirstQuestion();
  });
}
// ADD EMPLOYEE
function addEmployees() {
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) console.error(err);
    console.log(results);
    prompt_employee(results);
  });
}
function prompt_employee(results){
  let allroles = results.map((role) => {
    return { name: role.title, value: role.id };
  });
  console.log(allroles);
  {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the new employee?",
          name: "first_name",
        },
        {
          type: "input",
          message: "what is the last name of the new employee",
          name: "last_name",
        },

        {
          type: "list",
          message: "what is the role",
          name: "role_id",
          choices: allroles
        },
      ])
      .then((responses) => {
        // console.log(responses);
        insertEmployee(responses);
      });
  }
}
function insertEmployee(data) {
  connection.query('INSERT INTO employee SET ?', data, (err) => {
    if (err) return console.error(err);
    console.log(data);
    console.log("employee added");
    askFirstQuestion();
  });
}


// view departments Customer Service and Real Estate Agents
function viewDepartments() {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) console.log("error");
    console.table(results);
  });
}
// view Roles 1)sales manager and 2)broker
function viewRoles() {
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) console.log("error");
    console.table(results);
  });
}
// view employees Jenn and Edu
function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) console.log("error");
    console.table(results);
  });
}
//Update employee role

function updateEmployeesRoles() {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) console.error(err);
    allEmployees = results.map((data) => {
      return {
        name: data.first_name + '' + data.last_name,
        value: { ...data },
      };
    });
    inquirer
      .prompt([
        {
          type: 'list',
          message: 'Which employee are you updating?',
          name: 'chosen',
          choices: allEmployees,
        },
      ])
      .then((answers) => {
        let chosen = answers.chosen;
        //console.log(answers.chosen);
        updateRole(chosen);
      });
  });
}
function updateRole(chosen) {
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) console.error(err);
    allRoles = results.map((data) => {
      return { name: data.title, value: data.id };
    });
    //console.log(allRoles);
    inquirer
      .prompt([
        {
          type: 'list',
          message: 'What is this employee’s new role?',
          name: 'role',
          choices: allRoles,
        },
      ])
      .then((answers) => {
        let { role } = answers;
        role = parseInt(role);
        const setValue = { role_id: role };
        const whereValue = { id: chosen.id };
        connection.query(
          'UPDATE employee SET ? WHERE ?',
          [setValue, whereValue],
          (err) => {
            if (err) console.error(err);
            console.log('Employee has been updated.');
            askFirstQuestion();
          }
        );
      });
  });
}