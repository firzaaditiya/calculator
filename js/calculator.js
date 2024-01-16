const displayCalc = document.querySelector("#display-calc");
const displayResult = document.querySelector("#display-result");

const btnOpening = document.querySelector("#opening");
const btnClosing = document.querySelector("#closing");
const btnPercentSign = document.querySelector("#percent-sign");
const btnAllClear = document.querySelector("#all-clear");

const btnSeven = document.querySelector("#num-seven");
const btnEight = document.querySelector("#num-eight");
const btnNine = document.querySelector("#num-nine");
const btnDivideSign = document.querySelector("#divide-sign");

const btnFour = document.querySelector("#num-four");
const btnFive = document.querySelector("#num-five");
const btnSix = document.querySelector("#num-six");
const btnMutiplication = document.querySelector("#multiplication");

const btnOne = document.querySelector("#num-one");
const btnTwo = document.querySelector("#num-two");
const btnThree = document.querySelector("#num-three");
const btnHyphenSign = document.querySelector("#hyphen-sign");

const btnZero = document.querySelector("#num-zero");
const btnPeriod = document.querySelector("#period");
const btnEqualsSign = document.querySelector("#equals-sign");
const btnPlusSign = document.querySelector("#plus-sign");

const listOfFormula = [];
const listOfOperation = [];

const DIVIDE = "/";
const MULTIPLICATION = "*";
const MIN = "-";
const PLUS = "+";
const PERCENT = "%";
const ZERO = "0";

const formula = {
    text: "",
    hasDecimal: false,
    hasPercentage: false
};

let result = 0;
let isNewFormula = false;

displayCalc.innerHTML += "&nbsp;";
displayResult.innerText = 0;

function addCurrentFormula(typeOperation) {
    if (formula.text.length >= 1) {
        listOfFormula.push(formula.text);
    }

    if (typeOperation != undefined) {
        listOfOperation.push(typeOperation);
    }

    formula.text = "";
    formula.hasDecimal = false;
    formula.hasPercentage = false;
}

function update() {
    const listOfOperator = [DIVIDE, MULTIPLICATION, MIN, PLUS, PERCENT];

    if (listOfFormula.length < 1 && listOfOperation.length < 1) {
        isNewFormula = false;
    } else {
        for (const operator of listOfOperator) {
            if (listOfOperation[listOfOperation.length - 1] != operator) {
                isNewFormula = false;
            } else {
                isNewFormula = true;
                break;
            }
        }
    }
}

function updateZero() {
    if (formula.text[0] != undefined) {
        if (formula.text[0] != ZERO) {
            formula.text += ZERO;
            displayCalc.innerHTML += ZERO;
        } else if (formula.text[1] != undefined) {
            if (formula.text[1] != ZERO) {
                formula.text += ZERO;
                displayCalc.innerHTML += ZERO;
            }
        }
    } else {
        formula.text += ZERO;
        displayCalc.innerHTML += ZERO;
    }
}

function calculate() {
    const regexFormula = /^[0-9\(\)\.]+$/;

    listOfFormula.forEach((formula) => {
        if (!regexFormula.test(formula)) {
            throw new Error("Formula Pattern Error");
        }
    });

    const regexOperator = /[+\-\/*]/;

    listOfOperation.forEach((operator) => {
        if (!regexOperator.test(operator)) {
            throw new Error("Operator Pattern Error");
        }
    });

    let mergedFormula = "";

    let index = 0;
    for (const formulaData of listOfFormula) {
        mergedFormula += formulaData;

        if (listOfOperation[index]) {
            mergedFormula += listOfOperation[index];
            index++;
        }
    }

    return Function(`"use strict"; return (${mergedFormula})`)();
}

btnPlusSign.addEventListener("click", function() {
    if (!isNewFormula) {
        addCurrentFormula(PLUS);
        displayCalc.innerHTML += "&#43;";
    }

    update();
});

btnHyphenSign.addEventListener("click", function() {
    
    if (!isNewFormula) {
        addCurrentFormula(MIN);
        displayCalc.innerHTML += "&#45;";
    }

    update();
});

btnMutiplication.addEventListener("click", function() {
    
    if (!isNewFormula) {
        addCurrentFormula(MULTIPLICATION);
        displayCalc.innerHTML += "&#215;";
    }

    update();
});

btnDivideSign.addEventListener("click", function() {
    
    if (!isNewFormula) {
        addCurrentFormula(DIVIDE);
        displayCalc.innerHTML += "&#247;";
    }

    update();
});

btnOpening.addEventListener("click", function() {
    isNewFormula = false;
    formula.text += "(";
    displayCalc.innerHTML += "&#40;";
});

btnClosing.addEventListener("click", function() {
    isNewFormula = false;
    formula.text += ")";
    displayCalc.innerHTML += "&#41;";
});

btnPercentSign.addEventListener("click", function() {
    isNewFormula = false;
    
    if (!formula.hasPercentage) {
        formula.text = `${parseFloat(formula.text.slice(0, formula.text.length)) / 100}`;
        displayCalc.innerHTML += "&#37;";
        formula.hasPercentage = true;
    }
});

btnPeriod.addEventListener("click", function() {
    isNewFormula = false;

    if (!formula.hasDecimal) {
        formula.text += ".";
        displayCalc.innerHTML += ".";
        formula.hasDecimal = true;
    }
});

btnZero.addEventListener("click", function() {
    isNewFormula = false;
    updateZero();
});

btnOne.addEventListener("click", function() {
    isNewFormula = false;
    formula.text += "1";
    displayCalc.innerHTML += "1";
});

btnTwo.addEventListener("click", function() {
    isNewFormula = false;
    formula.text += "2";
    displayCalc.innerHTML += "2";
});

btnThree.addEventListener("click", function() {
    isNewFormula = false;
    formula.text += "3";
    displayCalc.innerHTML += "3";
});

btnFour.addEventListener("click", function() {
    isNewFormula = false;
    formula.text += "4";
    displayCalc.innerHTML += "4";
});

btnFive.addEventListener("click", function() {
    isNewFormula = false;
    formula.text += "5";
    displayCalc.innerHTML += "5";
});

btnSix.addEventListener("click", function() {
    isNewFormula = false;
    formula.text += "6";
    displayCalc.innerHTML += "6";
});

btnSeven.addEventListener("click", function() {
    isNewFormula = false;
    formula.text += "7";
    displayCalc.innerHTML += "7";
});

btnEight.addEventListener("click", function() {
    isNewFormula = false;
    formula.text += "8";
    displayCalc.innerHTML += "8";
});

btnNine.addEventListener("click", function() {
    isNewFormula = false;
    formula.text += "9";
    displayCalc.innerHTML += "9";
});

btnAllClear.addEventListener("click", function() {
    isNewFormula = false;
    listOfFormula.splice(0, listOfFormula.length);
    listOfOperation.splice(0, listOfOperation.length);
    formula.text = "";
    formula.hasDecimal = false;
    formula.hasPercentage = false;
    result = 0;
    displayCalc.innerHTML = "&nbsp;";
    displayResult.innerText = 0;
});

btnEqualsSign.addEventListener("click", function() {
    try {
        addCurrentFormula();

        result = calculate();

        displayResult.innerText = result;
        displayCalc.innerHTML = "&nbsp;";   
        listOfFormula.splice(0, listOfFormula.length);
        listOfOperation.splice(0, listOfOperation.length);
    } catch(error) {
        displayResult.innerText = "Error";
    }
});