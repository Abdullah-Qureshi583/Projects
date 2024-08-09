var buttons = document.querySelectorAll(".boxes");
var display = document.querySelector("#display");
var calculatedValue = " ";
display.innerText = 0;
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        var userOperator = button.getAttribute("id");
        if (userOperator == "+" ||
            userOperator == "-" ||
            userOperator == "*" ||
            userOperator == "/") {
            display.innerText += userOperator;
        }
        else if (userOperator === "=") {
            try {
                calculatedValue = eval(display.innerText).toString();
                if (calculatedValue.includes(".")) {
                    display.innerText = Number(calculatedValue).toFixed(4);
                }
                else {
                    display.innerText = calculatedValue;
                }
            }
            catch (e) {
                display.innerText = "Syntax Error!";
            }
        }
        else if (userOperator === "AC") {
            display.innerText = "0";
        }
        else if (display.innerText) {
            if (display.innerText == calculatedValue ||
                display.innerText == 0 ||
                display.innerText == "Syntax Error!") {
                display.innerText = userOperator;
            }
            else {
                display.innerText += userOperator;
            }
        }
    });
});
