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
    if (b == 0) {
        return "Error";
    }
    return a / b;
}

operate = (callback, a, b) => {
    return callback(a, b);
}

let currentResult = 0;
let currentOp = add;

const currentNum = [];
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
        currentNum.push(num);

        display.textContent = parseInt(currentNum.join(""));
    })
});


opsLvl1.forEach(element => {
    element.addEventListener("click", () => {
        numsArr.push(currentResult);
        if (opsArr.length > 0) {
            numsArr.push(parseInt(currentNum.join("")));
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
        console.log(currentResult);
        display.textContent = currentResult;
        currentNum.splice(0);

    })
});

opsLvl2.forEach(element => {
    element.addEventListener("click", () => {
        currentOp = element.id == "multiply"? multiply: divide;
        numsArr.push(currentResult);
        if (opsArr.length > 0) {
            numsArr.push(parseInt(currentNum.join("")));
        }

        while (opsArr.length > 1) {
            const operator  = opsArr.pop();
            const lastNum = numsArr.pop();
            const prevNum = numsArr.pop();
            numsArr.push(operate(operator, prevNum, lastNum));
        }
        
        opsArr.push(currentOp);

        currentResult = numsArr.pop();
        console.log(currentResult);

        display.textContent = currentResult;
        currentNum.splice(0);

    })
});

equals.addEventListener("click", () => {
    numsArr.push(currentResult);
    numsArr.push(parseInt(currentNum.join("")));
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
    console.log(opsArr);
    console.log(numsArr);
    display.textContent = currentResult;
})