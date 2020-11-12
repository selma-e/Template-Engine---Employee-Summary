// Dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

async function createPage() {
    var employees = [];

    const managerInfo = await inquirer.prompt([{
            type: "input",
            message: "What is your full name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your employee id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your office number?",
            name: "officeNumber"
        }
    ]); //ask user for manager info
    employees.push(new Manager(managerInfo.name, managerInfo.id, managerInfo.email, managerInfo.officeNumber)) //pass manager info into manager constructor
    const teamMemberCount = (await inquirer.prompt([{
        type: "input",
        message: "How many members are on your team?",
        name: "count",
        validate: function (input) {
            if (isNaN(input) || input === null) {
                return "Please try inputting a number.";
            } else {
                return true;
            }
        }
    }])).count; //ask the user how many team mates they need to add
    for (let i = 0; i < teamMemberCount; i++) {
        const employeeType = (await inquirer.prompt([{
            type: "list",
            message: "What is the role of the member on your team?",
            name: "role",
            choices: ["Engineer", "Intern"]
        }])).role; //ask the user what employee type they want to make
        if (employeeType === "Engineer") {
            const engineerInfo = await inquirer.prompt([{
                    type: "input",
                    message: "What is their full name?",
                    name: "name"
                },
                {
                    type: "input",
                    message: "What is their employee id?",
                    name: "id"
                },
                {
                    type: "input",
                    message: "What is their email address?",
                    name: "email"
                },
                {
                    type: "input",
                    message: "What is their Github username?",
                    name: "github"
                }
            ]);; //ask the user for engineer info
            employees.push(new Engineer(engineerInfo.name, engineerInfo.id, engineerInfo.email, engineerInfo.github))

        } else {
            const internInfo = await inquirer.prompt([{
                    type: "input",
                    message: "What is their full name?",
                    name: "name"
                },
                {
                    type: "input",
                    message: "What is their employee id?",
                    name: "id"
                },
                {
                    type: "input",
                    message: "What is their email address?",
                    name: "email"
                },
                {
                    type: "input",
                    message: "What is their school?",
                    name: "school"
                }
            ]);; //ask the user for intern info
            employees.push(new Intern(internInfo.name, internInfo.id, internInfo.email, internInfo.school))
        }
    }
    let html = render(employees);
    const output = path.resolve(__dirname, "output");
    const final_output = path.join(output, "team.html");
    if (!fs.existsSync(output)) {
        fs.mkdirSync(output);
    }
    fs.writeFile(final_output, html, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Your information has been successfully inputed.");
        }
    });
}
createPage();