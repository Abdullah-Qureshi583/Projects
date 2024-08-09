#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// storing pincode and userBalance in a variable
const pinCode = 7777;
let userBalance = 10000;
// Printing greeting message.
console.log(chalk.rgb(216, 225, 253)("Welcome to Personal ATM machine"));
// This function tells that if user withdraw more than his balance, it shows "Insufficient balance"
function insufficientBalance(amount) {
    if (amount > userBalance) {
        console.log(chalk.rgb(214, 40, 40)(`Insufficient amount! Your reamaining balance is : 
        ${userBalance} but you try to withdraw ${amount}`));
    }
    else {
        userBalance -= amount;
        console.log(chalk.rgb(168, 178, 244)(`Your remaining balance is : ${userBalance}`));
    }
}
// This inquirer prompt ask the user to enter his pinCode
const pinAnswer = await inquirer.prompt({
    name: "userPin",
    type: "number",
    message: chalk.rgb(141, 144, 206)("Enter your pin code"),
});
// If the pin code is correctm, it show the "withdraw","checkBalance" and "fastCash"
if (pinAnswer.userPin === pinCode) {
    const optionAnswer = await inquirer.prompt({
        name: "userOption",
        type: "list",
        message: chalk.rgb(200, 209, 250)("Please select option"),
        choices: ["withdraw", "fastCash", "checkBalance"],
    });
    // If the user select withdraw a prompt will show to the user that " enter amount to withdraw"
    if (optionAnswer.userOption === "withdraw") {
        const amountAnswer = await inquirer.prompt({
            name: "userAmount",
            type: "number",
            message: chalk.rgb(200, 209, 250)("Enter amount to withdraw"),
        });
        // Calling the function "insufficientBalance"
        insufficientBalance(amountAnswer.userAmount);
    }
    // If the user select fastCash a prompt will show to the user that " Select amount to fastCash"
    else if (optionAnswer.userOption === "fastCash") {
        const fastCashAnswer = await inquirer.prompt({
            name: "userFastCash",
            type: "list",
            message: chalk.rgb(200, 209, 250)("Choose the amount to fastCash"),
            choices: ["500", "1000", "5000", "10000", "15000", "20000"],
        });
        // Calling the function "insufficientBalance"
        insufficientBalance(fastCashAnswer.userFastCash);
    }
    // If the user select checkBalance a prompt will show with userBalance.
    else if (optionAnswer.userOption === "checkBalance") {
        console.log(chalk.rgb(168, 178, 244)(`Your current balance is : ${userBalance}`));
    }
}
else {
    console.log(chalk.rgb(214, 40, 40)("Incorrect pin code"));
}
// Printing goodbye message
console.log(chalk.rgb(216, 225, 253)("Thanks to use our ATM Machine"));
