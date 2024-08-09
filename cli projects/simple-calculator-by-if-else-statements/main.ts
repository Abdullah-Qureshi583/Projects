#! /usr/bin/env node
import inquirer from "inquirer";

const questions : {
    num1: number
    num2: number
    operator: string
} = await inquirer.prompt([
    {
        name: "num1",
        type: "number",
        message: "Enter your first number"
    },
    {
        name: "num2",
        type: "number",
        message: "Enter your second number"
    },
    {
        name: "operator",
        type: "list",
        message: "Select an operation",
        choices: ["Add", "Subtract", "Multiply", "Divide"],

    }
]);

const {num1, num2, operator} = questions;

let answer;

if(operator == "Add") {
    answer = num1 + num2;
} else if (operator == "Subtract") {
    answer = num1 - num2;
} else if (operator == "Multiply") {
    answer = num1 * num2;
} else if (operator == "Divide") {
    answer = num1 / num2;
}else {
    answer = "Invalid operator";
}

console.log(`${num1} is ${operator}ed by ${num2} = ${answer}`);

