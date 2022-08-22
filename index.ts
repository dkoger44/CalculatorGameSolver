//How many moves the player is allowed
const moves = 6;

//The number that must be displayed by the calculator
const goal = "13";

//The value displayed by the calculator at the beginning of the game
const initialDisplay = `2152`;

const operators = {
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
  replace: "replace",
};

interface GameButton {
  operator: string;
  operand?: number | string;
  id: number;
  replaceFunction?: ReplaceFunction;
  direction?: string;
}

interface ReplaceFunction {
  target: string;
  replacement: string;
}

let button1: GameButton = {
  operator: operators.replace,
  id: 1,
  replaceFunction: {
    target: "25",
    replacement: "12",
  } as ReplaceFunction,
};

let button2: GameButton = {
  operator: operators.replace,
  id: 2,
  replaceFunction: {
    target: "21",
    replacement: "3",
  } as ReplaceFunction,
};

let button3: GameButton = {
  operator: operators.replace,
  id: 3,
  replaceFunction: {
    target: "12",
    replacement: "5",
  } as ReplaceFunction,
};

let button4: GameButton = {
  operator: operators.shift,
  id: 4,
  direction: "RIGHT",
};

let button5: GameButton = {
  operator: operators.reverse,
  id: 5,
};


let buttons = [button1, button2, button3, button4, button5];

//This will find the solution to the problem
const solve = function () {
  let solution: any = [];

  solution = pressButton(
    moves,
    initialDisplay,
    solution,
    "No Button his first call"
  );
  return solution;
};

//recursive function to press buttons
const pressButton = function (
  remainingMoves: number,
  display: string,
  solution: any[],
  buttonPressed: string
): any {
  console.log(buttonPressed);
  console.log("We pressed a button! Remaining moves are: ", remainingMoves);
  //check if we have the answer
  if (display == goal && remainingMoves >= 0) {
    console.log("We found a solution its: ", solution);
    console.log("The display reads: ", display);
    return { solution, display };
  }
  //check if we ran out of moves
  else if (remainingMoves <= 0) {
    return { solution, display };
  }
  //press a new button
  else {
    console.log("The current solution array is: ", solution);
    console.log("Current display is: ",display);
    let newMoves = remainingMoves - 1;
    console.log("New Moves is: ", newMoves);

    let correctSolution = false;
    for (let i = 0; i < buttons.length; i++) {
      let potentialSolution = pressButton(
        newMoves,
        modifyDisplay(display, buttons[i]),
        solution.concat([buttons[i]]),
        `Pressed: Button ${buttons[i].id}`
      );
      if (potentialSolution?.display == goal) {
        correctSolution = potentialSolution;
        break;
      }
    }
    return correctSolution;
  }
};

//This will take the calculator display and modify it based on the button that was pressed
function modifyDisplay(display: string | number, button: any): string {
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
      display = sumDisplay(display as string);
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
function reverseDisplay(display: string): string{
  let newString = '';
  for (let i = display.length-1; i>=0; i--){
    newString = newString + display[i];
  }
  return newString
}

//This is a function to replace a specific sequence of digits in the display with a provided replacement sequence
function replaceDigits(
  display: string,
  replaceFunction: ReplaceFunction
): string {
  if (display.length > 1) {
    const targetString = new RegExp(replaceFunction.target,'g');
    display = display.replace(
      targetString,
      replaceFunction.replacement
    );
  }
  return display;
}

//This is a special button that causes the display to be the sum of all the digits in the display
function sumDisplay(display: string): string {
  let sum = 0;
  if (display.length > 0) {
    for (let i = 0; i < display.length; i++) {
      sum = sum + +display[i];
    }
    return sum + "";
  } else return "";
}

//This is a simple function to raise the display to an exponent
function raiseDisplayToPower(display: number, power: number): string {
  if (power == 0) {
    return "1";
  }
  for (let i = 0; i < power; i++) {
    display = display * display;
  }
  return display + "";
}

//This function will display the digits of the display 1 step to the left or to the right.
function shiftDisplay(display: string, direction: string): string {
  if (display.length == 0) {
    return display;
  }
  let newDisplay = "";
  if (direction.toUpperCase() === "LEFT") {
    for (let i = 1; i < display.length; i++) {
      newDisplay = newDisplay + display[i];
    }
    newDisplay = newDisplay + display[0];
  } else {
    if (direction.toUpperCase() === "RIGHT") {
      newDisplay = display[display.length - 1];
      for (let i = 0; i < display.length - 1; i++) {
        newDisplay = newDisplay + display[i];
      }
    }
  }
  return newDisplay;
}

console.log("Trying to solve...");
console.log("The solution is: ", solve());
