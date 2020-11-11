// Dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

async function createPage() {
    let employees = [];
    const html = render(employees);
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
                return "please try inputting a number.";
            } else {
                return true;
            }
        }
    }])).count; //ask the user how many team mates they need to add
    for (let i = 0; i < teamMemberCount; i++) {
        const employeeType = (await inquirer.prompt([{
            type: "list",
            message: "What is the role of a member on your team?",
            name: "role",
            choices: ["Engineer", "Intern"]
        }])).role; //ask the user what employee type they want to make
        if (employeeType === "Engineer") {
            const engineerInfo = await inquirer.prompt([{
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
                    message: "What is your github username?",
                    name: "github"
                }
            ]);; //ask the user for engineer info
            employees.push(new Engineer(engineerInfo.name, engineerInfo.id, engineerInfo.email, engineerInfo.github))
        } 
        else {
            const internInfo = await inquirer.prompt([{
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
                    message: "What is your school?",
                    name: "school"
                }
            ]);; //ask the user for intern info
            employees.push(new Intern(internInfo.name, internInfo.id, internInfo.email, internInfo.school))
        }
    }
    
    const output = path.resolve(__dirname, "output");
    const final_output = path.join(output, "team.html");
    if (!fs.existsSync(output)) {
        fs.mkdirSync(output);
      }

    //write the html string to a file via FS
    // fs.writeFile(final_output, html, function (err) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("The file was saved!");
    //     }
    // });
    console.log(final_output);
}
createPage();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```