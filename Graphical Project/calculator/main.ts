let buttons = document.querySelectorAll(".boxes");
let display:any = document.querySelector("#display");
let calculatedValue:string = " "
display.innerText = 0

buttons.forEach(button => {
    button.addEventListener("click",()=>{

        let userOperator = button.getAttribute("id");

        if(
            userOperator == "+"||
            userOperator == "-"||
            userOperator == "*"||
            userOperator == "/"
        ){
            display.innerText += userOperator
        }

        else if(userOperator === "="){
            try{
                calculatedValue = eval(display.innerText).toString();
                if(calculatedValue.includes(".")){
                    display.innerText=  Number(calculatedValue).toFixed(4)
                }else{
                    display.innerText =calculatedValue
                }
            }catch(e){
                display.innerText = "Syntax Error!"
            }
        }

        else if(userOperator === "AC"){
            display.innerText = "0"
        }
        
        else if(display.innerText){
            if(
                display.innerText == calculatedValue||
                display.innerText == 0||
                display.innerText == "Syntax Error!"
            ){
                display.innerText = userOperator;
            } else{
                display.innerText += userOperator;
            }
        }
    });
});