//How many moves the player is allowed
var moves = 6;
//The number that must be displayed by the calculator
var goal = "13";
//The value displayed by the calculator at the beginning of the game
var initialDisplay = "2152";
var operators = {
    multiply: "multiply",
    divide: "divide",
    add: "add",
    subtract: "subtract",
    insert: "insert",
    sum: "sum",
    reverse: "reverse",
    exponent: "exponent",
    flipSign: "flip sign",
    shift: "shift",
    replace: "replace"
};
var button1 = {
    operator: operators.replace,
    id: 1,
    replaceFunction: {
        target: "25",
        replacement: "12"
    }
};
var button2 = {
    operator: operators.replace,
    id: 2,
    replaceFunction: {
        target: "21",
        replacement: "3"
    }
};
var button3 = {
    operator: operators.replace,
    id: 3,
    replaceFunction: {
        target: "12",
        replacement: "5"
    }
};
var button4 = {
    operator: operators.shift,
    id: 4,
    direction: "RIGHT"
};
var button5 = {
    operator: operators.reverse,
    id: 5
};
var buttons = [button1, button2, button3, button4, button5];
//This will find the solution to the problem
var solve = function () {
    var solution = [];
    solution = pressButton(moves, initialDisplay, solution, "No Button his first call");
    return solution;
};
//recursive function to press buttons
var pressButton = function (remainingMoves, display, solution, buttonPressed) {
    console.log(buttonPressed);
    console.log("We pressed a button! Remaining moves are: ", remainingMoves);
    //check if we have the answer
    if (display == goal && remainingMoves >= 0) {
        console.log("We found a solution its: ", solution);
        console.log("The display reads: ", display);
        return { solution: solution, display: display };
    }
    //check if we ran out of moves
    else if (remainingMoves <= 0) {
        return { solution: solution, display: display };
    }
    //press a new button
    else {
        console.log("The current solution array is: ", solution);
        console.log("Current display is: ", display);
        var newMoves = remainingMoves - 1;
        console.log("New Moves is: ", newMoves);
        var correctSolution = false;
        for (var i = 0; i < buttons.length; i++) {
            var potentialSolution = pressButton(newMoves, modifyDisplay(display, buttons[i]), solution.concat([buttons[i]]), "Pressed: Button ".concat(buttons[i].id));
            if ((potentialSolution === null || potentialSolution === void 0 ? void 0 : potentialSolution.display) == goal) {
                correctSolution = potentialSolution;
                break;
            }
        }
        return correctSolution;
    }
};
//This will take the calculator display and modify it based on the button that was pressed
function modifyDisplay(display, button) {
    switch (button.operator) {
        case operators.add:
            display = +display + button.operand;
            break;
        case operators.subtract:
            display = +display - button.operand;
            break;
        case operators.multiply:
            display = +display * button.operand;
            break;
        case operators.insert:
            display = display + button.operand;
            break;
        case operators.sum:
            display = sumDisplay(display);
            break;
        case operators.exponent:
            display = raiseDisplayToPower(+display, button.operand);
            break;
        case operators.flipSign:
            display = +display * -1;
            break;
        case operators.shift:
            display = shiftDisplay(display + "", button.direction);
            break;
        case operators.replace:
            display = replaceDigits(display + "", button.replaceFunction);
            break;
        case operators.reverse:
            display = reverseDisplay(display + "");
            break;
        default:
            throw console.error("No operator case found!!!");
    }
    return display + "";
}
//This is a function to reverse the display '123' becomes '321'
function reverseDisplay(display) {
    var newString = '';
    for (var i = display.length - 1; i >= 0; i--) {
        newString = newString + display[i];
    }
    return newString;
}
//This is a function to replace a specific sequence of digits in the display with a provided replacement sequence
function replaceDigits(display, replaceFunction) {
    if (display.length > 1) {
        // const targetString = new RegExp(replaceFunction.target,'g');
        display = display.replaceAll(replaceFunction.target, replaceFunction.replacement);
    }
    return display;
}
//This is a special button that causes the display to be the sum of all the digits in the display
function sumDisplay(display) {
    var sum = 0;
    if (display.length > 0) {
        for (var i = 0; i < display.length; i++) {
            sum = sum + +display[i];
        }
        return sum + "";
    }
    else
        return "";
}
//This is a simple function to raise the display to an exponent
function raiseDisplayToPower(display, power) {
    if (power == 0) {
        return "1";
    }
    for (var i = 0; i < power; i++) {
        display = display * display;
    }
    return display + "";
}
//This function will display the digits of the display 1 step to the left or to the right.
function shiftDisplay(display, direction) {
    if (display.length == 0) {
        return display;
    }
    var newDisplay = "";
    if (direction.toUpperCase() === "LEFT") {
        for (var i = 1; i < display.length; i++) {
            newDisplay = newDisplay + display[i];
        }
        newDisplay = newDisplay + display[0];
    }
    else {
        if (direction.toUpperCase() === "RIGHT") {
            newDisplay = display[display.length - 1];
            for (var i = 0; i < display.length - 1; i++) {
                newDisplay = newDisplay + display[i];
            }
        }
    }
    return newDisplay;
}
// console.log("Trying to solve...");
// console.log("The solution is: ", solve());
console.log("Trying replaceAll");
console.log(replaceDigits("1212", { target: '12', replacement: '5' }));
