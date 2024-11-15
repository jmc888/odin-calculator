// Basic math operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Function to operate using a callback
const operate = (callback, a, b) => callback(a, b);

// Reset logic for the calculator
reset = () => {
    currentResult = 0;
    currentNum = 0;
    numsArr.splice(0);
    opsArr.splice(0);
    opsArr.push(add);
    display.textContent = currentResult;
    resetOpColor();
}

// Resets operator button colors
resetOpColor = () => {
    ops.forEach(element => {
        element.style.backgroundColor = OP_DEFAULT_COLOR;

    })
}

// Global variables
let currentResult = 0;
let currentOp = add;
let currentNum = 0;
let percentageOverwrite = 1;

const currentNumArr = [];
const numsArr = [];
const opsArr = [];

// Constants
const OP_STRING_TO_FUNCTION = { "add": add, "subtract": subtract, "multiply": multiply, "divide": divide };
const OP_CLICK_ON_COLOR = "#F2809F"
const OP_DEFAULT_COLOR = "#735368"
const BASE_LVL_OPERATORS = ["add", "subtract"];

// DOM elements
const numbers = document.querySelectorAll(".numbers");
const dot = document.getElementById("dot");
const display = document.getElementById("display");
const ops = document.querySelectorAll(".operators");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const plusMinusConvert = document.getElementById("plus-minus-convert");
const percentageConvert = document.getElementById("percentage-convert");

// Number input logic
numbers.forEach(element => {
    element.addEventListener("click", (event) => {
        const num = event.target.textContent;
        if (!(currentNumArr.length == 0 && num == "0")) {
            currentNumArr.push(num);
            display.textContent = currentNumArr.join("");
            clear.textContent = "C";
        }
        resetOpColor();
    })
});

// Decimal point logic
dot.addEventListener("click", () => {
    if (!currentNumArr.includes(".")) {
        if (currentNumArr.length == 0) {
            currentNumArr.push("0");
        }
        currentNumArr.push(".");
        display.textContent = currentNumArr.join("");
        clear.textContent = "C";
    }
    resetOpColor();

})

// Operator button logic
ops.forEach(element => {
    element.addEventListener("click", () => {
        const opDivId = element.id;
        const opLvl = BASE_LVL_OPERATORS.includes(opDivId) ? 0 : 1;
        currentOp = OP_STRING_TO_FUNCTION[opDivId];

        // A `=` press followed by a number input
        if (opsArr.length == 0 && currentNumArr.length > 0) {
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
                const operator = opsArr.pop();
                const lastNum = numsArr.pop();
                const prevNum = numsArr.pop();
                numsArr.push(operate(operator, prevNum, lastNum));
            }
        }

        opsArr.push(currentOp);
        currentResult = numsArr.pop();
        currentNumArr.splice(0);
        percentageOverwrite = 1;
        display.textContent = isFinite(currentResult) ? currentResult : "ERROR";

        resetOpColor();
        element.style.backgroundColor = OP_CLICK_ON_COLOR;

    })
});

// Equals button logic
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
            const operator = opsArr.pop();
            const lastNum = numsArr.pop();
            const prevNum = numsArr.pop();
            numsArr.push(operate(operator, prevNum, lastNum));
        }
    }

    currentResult = numsArr.pop();
    display.textContent = isFinite(currentResult) ? currentResult : "ERROR";
    currentNumArr.splice(0);
    percentageOverwrite = 1;
    resetOpColor();

})

// Clear button logic
clear.addEventListener("click", () => {
    if (clear.textContent == "C") {
        currentNumArr.splice(0);
        // Clear followed by `=` press also clear current result
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

// Plus-minus toggle logic
plusMinusConvert.addEventListener("click", () => {
    if (currentNumArr.length == 0) {
        // Toggle result
        if (display.textContent === "0") {
            display.textContent = "-0";
        } else if (display.textContent === "-0") {
            display.textContent = "0";
        } else if (!isFinite(currentResult)) {
            display.textContent = "ERROR";
        } else {
            currentResult = -currentResult;
            display.textContent = currentResult;
        }
    } else {
        // Toggle input    
        if (currentNumArr.includes("-")) {
            currentNumArr.shift();
        } else {
            currentNumArr.unshift("-");
        }
        display.textContent = currentNumArr.join("");

    }
})

// Percentage conversion logic
percentageConvert.addEventListener("click", () => {
    if (currentNumArr.length == 0) {
        // Convert result
        currentResult = currentResult * 0.01;
        display.textContent = isFinite(currentResult) ? currentResult : "ERROR";
    } else {
        // Convert input    
        percentageOverwrite = percentageOverwrite * 0.01;
        display.textContent = parseFloat(currentNumArr.join("")) * percentageOverwrite;

    }
})