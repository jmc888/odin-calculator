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
dot = document.getElementById("dot");
display = document.getElementById("display");
ops = document.querySelectorAll(".operators");
equals = document.getElementById("equals");
clear = document.getElementById("clear");

numbers.forEach(element => {
    element.addEventListener("click", (event) => {
        const num = event.target.textContent;
        currentNumArr.push(num);
        display.textContent = currentNumArr.join("");
        clear.textContent = "C";
    })
});

dot.addEventListener("click", ()=> {
    if (!currentNumArr.includes(".")) {
            if (currentNumArr.length == 0) {
                currentNumArr.push("0");
            } 
            currentNumArr.push(".");
            display.textContent = currentNumArr.join("");
            clear.textContent = "C";
        }
})

ops.forEach(element => {
    element.addEventListener("click", () => {
        const opDivId = element.id;
        const opLvl = BASE_LVL_OPERATORS.includes(opDivId) ? 0: 1;
        currentOp = OP_STRING_TO_FUNCTION[opDivId];

        // A `=` press followed by a number input
        if (opsArr.length == 0 && currentNumArr.length > 0){ 
            reset();
        }

        numsArr.push(currentResult);

        // No number input before operation
        if (currentNumArr.length == 0) { 
            currentNum = currentResult;
            if (opsArr.length > 0) {
                opsArr.pop();
            }
        } 

        // Operation input does not immediately follow a `=` press
        // And a number input is detected before the operation input
        if (opsArr.length > 0 && currentNumArr.length > 0) {
            numsArr.push(parseFloat(currentNumArr.join("")));
        
            while (opsArr.length > opLvl) {
                const operator  = opsArr.pop();
                const lastNum = numsArr.pop();
                const prevNum = numsArr.pop();
                numsArr.push(operate(operator, prevNum, lastNum));
            }
        } 

        opsArr.push(currentOp);
        currentResult = numsArr.pop();
        currentNumArr.splice(0);
        display.textContent = currentResult;

    })
});

equals.addEventListener("click", () => {
    numsArr.push(currentResult);

    // A number input is detected before a `=` press
    if (currentNumArr.length > 0) {
        currentNum = parseFloat(currentNumArr.join(""));
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

clear.addEventListener("click", ()=> {
    if (clear.textContent == "C") {
        currentNumArr.splice(0);
        // Clear after `=` press to also result current result
        if (opsArr == 0) {
            currentResult = 0;
        }
        display.textContent = 0;
        clear.textContent = "AC";
    } else {
        reset();
    }
})