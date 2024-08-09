#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Asking user to select his chice
const userChoice = await inquirer.prompt({
    name: "choices",
    type: "list",
    message: `Select the option to perform`,
    choices: [
        "count word",
        "count letter",
        "count sentences",
        "count total words",
        "count total letters",
    ]
});
// if user choice is "count word"
if (userChoice.choices === "count word") {
    // asking user to enter the string
    const userString = await inquirer.prompt({
        name: "strings",
        type: "input",
        message: chalk.bgCyan("Enter your paragraph"),
    });
    let userStringAns = userString.strings.toLowerCase().split(" ");
    // asking user to enter the word to be count
    const userWord = await inquirer.prompt({
        name: "words",
        type: "input",
        message: chalk.inverse(`Enter the word to count the in your paragrah`),
        default: " "
    });
    let userWordAns = userWord.words.toLowerCase();
    //fincount word given by the user
    let count = 0;
    for (let i = 0; i < userStringAns.length; i++) {
        if (userWordAns === userStringAns[i]) {
            count++;
        }
    }
    console.log(chalk.bgBlackBright(`The "${userWordAns}" is present ${count} time in your paragrah`));
}
// if user choice is "count letter"
if (userChoice.choices === "count letter") {
    // asking user to enter the string
    const userString = await inquirer.prompt({
        name: "strings",
        type: "input",
        message: chalk.bgCyan("Enter your paragraph"),
    });
    let userStringAns = userString.strings.toLowerCase().split("");
    // asking user to enter the letter to be to be count
    const userLetter = await inquirer.prompt({
        name: "words",
        type: "input",
        message: chalk.inverse(`Enter the letter to count the in your paragrah`),
    });
    let userLetterAns = userLetter.words.toLowerCase();
    //finding number of letter given by the user
    let count = 0;
    for (let i = 0; i < userStringAns.length; i++) {
        if (userLetterAns === userStringAns[i]) {
            count++;
        }
    }
    console.log(chalk.bgBlackBright(`The "${userLetterAns}" is present ${count} time in your paragrah`));
}
// if user choice is "count sentences"
if (userChoice.choices === "count sentences") {
    // Asking the user to enter the paragraph
    const userString = await inquirer.prompt({
        name: "strings",
        type: "input",
        message: chalk.bgCyan("Enter your paragraph"),
    });
    let userStringAns = userString.strings;
    let count = 0;
    for (let i = 0; i < userStringAns.length; i++) {
        if (userStringAns[i] == "." && userStringAns[i + 1] == " ") {
            count++;
        }
    }
    console.log(chalk.bgBlackBright(`There are total ${count} sentences in your paragrah`));
}
// if user choice is "count total words"
if (userChoice.choices === "count total words") {
    // Asking the user to enter the paragraph
    const userString = await inquirer.prompt({
        name: "strings",
        type: "input",
        message: chalk.bgCyan("Enter your paragraph"),
    });
    // store in new variable and removing white spaces
    let userStringAns = userString.strings.split(" ").filter((val) => val >= " ");
    // Finding total number of words in paragraph
    let count = 0;
    for (let i = 0; i < userStringAns.length; i++) {
        count++;
    }
    console.log(chalk.bgBlackBright(`There are total ${count} words in your paragrah`));
}
// if user choice is "count total letters"
if (userChoice.choices === "count total letters") {
    // Asking the user to enter the paragraph
    const userString = await inquirer.prompt({
        name: "strings",
        type: "input",
        message: chalk.bgCyan("Enter your paragraph"),
    });
    let userStringAns = userString.strings.replaceAll(" ", "");
    // console.log(userStringAns);
    let count = 0;
    for (let i = 0; i < userStringAns.length; i++) {
        count++;
    }
    console.log(chalk.bgBlackBright(`There are total ${count} letters in your paragrah`));
}
