#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let compCount = 0;
let userCount = 0;
let condition = true;
// Show the greeting message to the user
let greet = chalk.bold.rgb(167, 117, 77)("\t\t   Welcome to my Game  \n") +
    chalk.bold.bgRgb(220, 204, 187).rgb(234, 180, 100)("\t\t" + "Rocks" + "\t" + "Papers" + "\t" + "Scissors");
console.log(greet);
// asking the user that how many point of game he will play
const count = await inquirer.prompt({
    name: "count",
    type: "list",
    message: chalk.rgb(252, 223, 166)("\nHow many points of game would you like to play?"),
    choices: ["3", "5", "10", "12", "15", "20"]
});
while (condition) {
    // taking computer choice though random number
    let choices = ["Rocks", "Papers", "Scissors"];
    let randomNumber = Math.floor(Math.random() * 3);
    let compChoice = choices[randomNumber];
    // Asking for the user choice
    const questions = await inquirer.prompt({
        name: "user",
        type: "list",
        message: chalk.rgb(252, 223, 166)("\nChoose your weapon"),
        choices: ["Rocks", "Papers", "Scissors"]
    });
    // Patterns if the user wins
    let userWins = questions.user === "Rocks" && compChoice === "Scissors" ||
        questions.user === "Papers" && compChoice === "Rocks" ||
        questions.user === "Scissors" && compChoice === "Papers";
    // Patterns if the computer wins
    let compWins = compChoice === "Rocks" && questions.user === "Scissors" ||
        compChoice === "Papers" && questions.user === "Rocks" ||
        compChoice === "Scissors" && questions.user === "Papers";
    // patterns if the game will draw
    let drawPattern = questions.user === compChoice;
    // To show the choices of user and computer
    let showPlayerChoices = () => {
        console.log(chalk.rgb(203, 157, 126).bold("\n\tYour Choice: ") +
            chalk.bold.underline.rgb(203, 232, 150)(questions.user) + "\n");
        console.log(chalk.rgb(203, 157, 126).bold("\tComputer Choice: ") +
            chalk.bold.underline.rgb(203, 232, 150)(compChoice) + "\n");
    };
    showPlayerChoices();
    if (userWins) {
        console.log(chalk.bold.rgb(234, 180, 100)("\t   you got one point\n"));
        userCount++;
    }
    else if (compWins) {
        console.log(chalk.bold.rgb(234, 180, 100)("\t  Computer got one point\n"));
        compCount++;
    }
    else if (drawPattern) {
        console.log(chalk.bold.rgb(234, 180, 100)("\t\t  Draw\n"));
    }
    // Show the points of user and computer
    console.log(chalk.bold.bgRgb(100, 110, 120)(" Your Points: ") +
        chalk.bold.bgRgb(234, 180, 100).black(" " + userCount + " ") + "\t" +
        chalk.bold.bgRgb(100, 110, 120)(" Computer Points: ") +
        chalk.bold.bgRgb(234, 180, 100).black(" " + compCount + " "));
    if (userCount == count.count) {
        console.log(chalk.bold.rgb(211, 208, 168).underline("\n_____ Congragulations!🥳 You won the game ____\n"));
        condition = false;
    }
    else if (compCount == count.count) {
        console.log(chalk.bold.rgb(211, 208, 168).underline("\n\t___ Computer won the game ___\n"));
        condition = false;
    }
}
