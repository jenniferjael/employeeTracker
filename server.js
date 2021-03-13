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
// build a function that will allow me to retrieve the questions regarding the chosen choice
// adding department function
function add_department() {
  console.log("departments here");
}
function addRoles() {
  console.log("roles here");
}
function addEmployees() {
  console.log("employees here");
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
