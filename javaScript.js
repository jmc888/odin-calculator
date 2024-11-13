add = (a, b) => {
    return a + b;
}

subtract = (a, b) => {
    return a - b;
}

multiply = (a, b) => {
    return a * b;
}

divide = (a, b) => {

    return a / b;
}

operate = (callback, a, b) => {
    return callback(a, b);
}

reset = () => {
    currentResult = 0;
    currentNum = 0; 
    numsArr.splice(0);
    opsArr.splice(0);
    opsArr.push(add);
    display.textContent = currentResult;
}

let currentResult = 0;
let currentOp = add;
let currentNum = 0; 

const currentNumArr = [];
const numsArr = [];
const opsArr = [];

const OP_STRING_TO_FUNCTION = {"add": add, "subtract": subtract, "multiply": multiply, "divide": divide};
const BASE_LVL_OPERATORS = ["add", "subtract"];

numbers = document.querySelectorAll(".numbers");
display = document.getElementById("display");
ops = document.querySelectorAll(".operators");
equals = document.getElementById("equals");


numbers.forEach(element => {
    element.addEventListener("click", (event) => {
        const num = event.target.textContent;
        currentNumArr.push(num);
        display.textContent = parseInt(currentNumArr.join(""));
        console.log(currentNumArr);
    })
});


ops.forEach(element => {
    element.addEventListener("click", () => {

        // A `=` press followed by a number input
        if (opsArr.length == 0 && currentNumArr.length > 0){ 
            console.log("I was reset");
            reset();
        // No number input before operation
        } else if (currentNumArr.length == 0) { 
            currentNum = currentResult;
        } 

        numsArr.push(currentResult);

        // Operation does not immediately follow a `=` press
        // And a number input is detected before operation
        if (opsArr.length > 0 && currentNumArr.length > 0) {
            console.log("successfully pushed");
            numsArr.push(parseInt(currentNumArr.join("")));
        } 
        
        const opDivId = element.id;
        const opLvl = BASE_LVL_OPERATORS.includes(opDivId) ? 0: 1;
        console.log(opsArr);

        currentOp = OP_STRING_TO_FUNCTION[opDivId];

        while (opsArr.length > opLvl) {
            console.log("I'm here");
            console.log(numsArr);

            const operator  = opsArr.pop();
            const lastNum = numsArr.pop();
            const prevNum = numsArr.pop();
            numsArr.push(operate(operator, prevNum, lastNum));
        }
        opsArr.push(currentOp);

        currentResult = numsArr.pop();
        display.textContent = currentResult;
        currentNumArr.splice(0);

    })
});

equals.addEventListener("click", () => {
    numsArr.push(currentResult);

    // A number input is detected before a `=` press
    if (currentNumArr.length > 0) {
        currentNum = parseInt(currentNumArr.join(""));
    } 
    numsArr.push(currentNum)
    
    // Consecutive `=` press
    if (opsArr.length == 0) {
        const lastInput = numsArr.pop();
        const preResult = numsArr.pop();
        numsArr.push(operate(currentOp, preResult, lastInput));
    } else {
        // Clear out all operations in the operation stack
        while (opsArr.length > 0) {
            const operator  = opsArr.pop();
            const lastNum = numsArr.pop();
            const prevNum = numsArr.pop();
            numsArr.push(operate(operator, prevNum, lastNum));
        }
    }

    currentResult = numsArr.pop();
    display.textContent = currentResult;
    currentNumArr.splice(0);
})