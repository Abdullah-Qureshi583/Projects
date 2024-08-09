#! /usr/bin/env node
import inquirer from "inquirer";
// 1) Computer will generate a random number
// 2) User input for guessing number
// 3) Campare user input number with computer generated number and show result
// 4) Using loop to guess number
const randomNumber = Math.floor(Math.random() * 10 + 1);
let condition = true;
while (condition === true) {
    const numberGuessingGame = await inquirer.prompt({
        name: "userGuessedNumber",
        type: "number",
        message: "Please guess a number between 1-10 :",
    });
    if (numberGuessingGame.userGuessedNumber === randomNumber) {
        console.log("Congratulations! you guessed right number");
    }
    else {
        console.log("You guessed wrong number!");
    }
    const askingTryAgain = await inquirer.prompt({
        name: "tryAgain",
        type: "confirm",
        message: "Do you want to play again?",
        default: "true"
    });
    if (askingTryAgain.tryAgain === false) {
        condition = false;
    }
}
