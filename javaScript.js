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
    currentNumArr.splice(0);
    numsArr.splice(0);
    opsArr.splice(0);
    opsArr.push(add);
}

let currentResult = 0;
let currentOp = add;
let currentNum = 0; 

const currentNumArr = [];
const numsArr = [];
const opsArr = [add];
const FIRST_LVL_OPERATORS = [add, subtract];
const SECOND_LVL_OPERATORS = [multiply, divide];

numbers = document.querySelectorAll(".numbers");
display = document.getElementById("display");
opsLvl1 = document.querySelectorAll(".operators-lvl1");
opsLvl2 = document.querySelectorAll(".operators-lvl2");
equals = document.getElementById("equals");


numbers.forEach(element => {
    element.addEventListener("click", (event) => {
        const num = event.target.textContent;
        currentNumArr.push(num);

        display.textContent = parseInt(currentNumArr.join(""));
        console.log(currentNumArr);
    })
});


opsLvl1.forEach(element => {
    element.addEventListener("click", () => {
        if (opsArr.length == 0 && currentNumArr.length > 0) {
            reset();
        }
        numsArr.push(currentResult);
        if (currentNumArr.length > 0) {
            currentNum = parseInt(currentNumArr.join(""));
            numsArr.push(currentNum);
        }

        currentOp = element.id == "add"? add: subtract;

        while (opsArr.length > 0) {
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

opsLvl2.forEach(element => {
    element.addEventListener("click", () => {
        currentOp = element.id == "multiply"? multiply: divide;
        numsArr.push(currentResult);
        if (opsArr.length > 0 && currentNumArr.length > 0 ) {
            currentNum = parseInt(currentNumArr.join(""));
            numsArr.push(currentNum);
        } 
        while (opsArr.length > 1) {
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
    if (currentNumArr.length > 0) {
        currentNum = parseInt(currentNumArr.join(""));
        numsArr.push(currentNum);
    } 
    numsArr.push(currentNum)
    
    if (opsArr.length == 0) {
        const lastNum = numsArr.pop();
        const prevNum = numsArr.pop();
        numsArr.push(operate(currentOp, prevNum, lastNum));
    } else {
        while (opsArr.length > 0) {
            const operator  = opsArr.pop();
            const lastNum = numsArr.pop();
            const prevNum = numsArr.pop();
            numsArr.push(operate(operator, prevNum, lastNum));
        }
    }

    currentResult = numsArr.pop();
    console.log("ops");
    console.log(opsArr);
    console.log("nums");
    console.log(numsArr);
    console.log("currNumArr");
    console.log(currentNumArr);
    display.textContent = currentResult;
    console.log("currNum");
    console.log(currentNum);
    currentNumArr.splice(0);
})