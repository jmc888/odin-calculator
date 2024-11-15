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
let percentageOverwrite = 1;

const currentNumArr = [];
const numsArr = [];
const opsArr = [];

const OP_STRING_TO_FUNCTION = {"add": add, "subtract": subtract, "multiply": multiply, "divide": divide};
const BASE_LVL_OPERATORS = ["add", "subtract"];

const numbers = document.querySelectorAll(".numbers");
const dot = document.getElementById("dot");
const display = document.getElementById("display");
const ops = document.querySelectorAll(".operators");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const plusMinusConvert = document.getElementById("plus-minus-convert");
const percentageConvert = document.getElementById("percentage-convert");

numbers.forEach(element => {
    element.addEventListener("click", (event) => {
        const num = event.target.textContent;
        if (!(currentNumArr.length == 0 && num == "0")) {
            currentNumArr.push(num);
            display.textContent = currentNumArr.join("");
            clear.textContent = "C";
        } 
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
            numsArr.push(parseFloat(currentNumArr.join("")) * percentageOverwrite);
        
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
        percentageOverwrite = 1;
        display.textContent = currentResult;

    })
});

equals.addEventListener("click", () => {
    numsArr.push(currentResult);

    // A number input is detected before a `=` press
    if (currentNumArr.length > 0) {
        currentNum = parseFloat(currentNumArr.join("")) * percentageOverwrite;
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
    percentageOverwrite = 1;

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
    percentageOverwrite = 1;
})

plusMinusConvert.addEventListener("click", () => {
    if (currentNumArr.length == 0) {
        if (display.textContent === "0") {
            display.textContent = "-0";
        } else if (display.textContent === "-0"){
            display.textContent = "0";
        } else {
            currentResult = -currentResult;
            display.textContent = currentResult;
        }
    } else {
        if (currentNumArr.includes("-")) {
            currentNumArr.shift();
        } else {
            currentNumArr.unshift("-");
        }
        display.textContent = currentNumArr.join("");

    }
})

percentageConvert.addEventListener("click", () => {
    if (currentNumArr.length == 0) {
        currentResult = currentResult * 0.01;
        display.textContent = currentResult;
    } else {
        percentageOverwrite = percentageOverwrite * 0.01;
        display.textContent = parseFloat(currentNumArr.join("")) * percentageOverwrite;

    }
})