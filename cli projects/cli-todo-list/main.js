#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let todo = await inquirer.prompt({
        name: "selectTask",
        type: "list",
        message: "Select an option to perform a task",
        choices: ["addTodo", "updateTodo", "deleteTodo", "checkList", "exit"]
    });
    if (todo.selectTask === "addTodo") {
        const addTodo = await inquirer.prompt({
            name: "add",
            type: "input",
            message: "Add a todo in you list",
        });
        if (addTodo.add === "") {
            console.log("Enter a valid todo");
            console.log("Items in your todos list are:");
            todos.forEach((todo, i) => {
                console.log(i + 1, todo);
            });
        }
        else {
            todos.push(addTodo.add);
            console.log("Items in your todos list are:");
            todos.forEach((todo, i) => {
                console.log(i + 1, todo);
            });
        }
    }
    if (todo.selectTask === "updateTodo") {
        const updateTodo = await inquirer.prompt({
            name: "update",
            type: "list",
            message: "Select todo to update your todos",
            choices: todos.map(item => item),
        });
        const addTodo = await inquirer.prompt({
            name: "add",
            type: "input",
            message: "Update a todo in you list",
        });
        let newTodo = todos.filter(val => val !== updateTodo.update);
        todos = [...newTodo, addTodo.add];
        if (addTodo.add === "") {
            console.log("Enter a valid todo");
            console.log("Items in your todos list are:");
            todos.forEach((todo, i) => {
                console.log(i + 1, todo);
            });
        }
        else {
            console.log("Items in your todos list are:");
            todos.forEach((todo, i) => {
                console.log(i + 1, todo);
            });
        }
    }
    if (todo.selectTask === "deleteTodo") {
        const deleteTodo = await inquirer.prompt({
            name: "delete",
            type: "list",
            message: "Select todo to delete from your todos",
            choices: todos,
        });
        let newTodo2 = todos.filter(val => val !== deleteTodo.delete);
        todos = newTodo2;
        console.log("Items in your todos list are:");
        todos.forEach((todo, i) => {
            console.log(i + 1, todo);
        });
    }
    if (todo.selectTask === "checkList") {
        console.log("Items in your todos list are:");
        todos.forEach((todo, i) => {
            console.log(i + 1, todo);
        });
    }
    if (todo.selectTask === "exit") {
        console.log('thanks to use our todos ');
        condition = false;
    }
}
