//How many moves the player is allowed
const moves = 5;

//The number that must be displayed by the calculator
const goal = "11";

//The value displayed by the calculator at the beginning of the game
const initialDisplay = `2`;

const operators = {
  multiply: "multiply",
  divide: "divide",
  add: "add",
  subtract: "subtract",
  insert: "insert",
  sum: "sum",
  reverse: "reverse",
  function: "function",
  exponent: "exponent",
  flipSign: "flip sign",
  shift: "shift",
};

let buttons = [];

let button1 = {
  operator: operators.multiply,
  operand: 2,
  id: 1,
};

let button2 = {
  operator: operators.insert,
  operand: "10",
  id: 2,
};

let button3 = {
  operator: operators.sum,
  id: 3,
};

let button4 = {
  operator: operators.exponent,
  operand: 3,
  id: 4,
};

function function5(display: string): string {
  //search through the display and morph every 10 into a 1

  if (display.length > 1) {
    return display.replace("10", "1");
  } else {
    return display;
  }
}
let button5 = {
  operator: operators.function,
  func: function5,
  id: 5,
};

// let button1 = {
//   operator: operators.add,
//   operand: 2,
//   id: 1
// }
// let button2 = {
//   operator: operators.shift,
//   direction: 'RIGHT',
//   id: 2
// }
// let button3 = {
//   operator: operators.shift,
//   direction: 'LEFT',
//   id: 3
// }

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
    let newMoves = remainingMoves - 1;
    console.log("New Moves is: ", newMoves);

    let solutionA = pressButton(
      newMoves,
      modifyDisplay(display, button1),
      solution.concat([button1]),
      "Pressed 1"
    );
    console.log("solutionA is: ", solutionA);
    if (solutionA?.display == goal) {
      return solutionA;
    }

    let solutionB = pressButton(
      newMoves,
      modifyDisplay(display, button2),
      solution.concat([button2]),
      "Pressed 2"
    );
    if (solutionB?.display == goal) {
      return solutionB;
    }

    let solutionC = pressButton(
      newMoves,
      modifyDisplay(display, button3),
      solution.concat([button3]),
      "Pressed 3"
    );
    if (solutionC?.display == goal) {
      return solutionC;
    }

    let solutionD = pressButton(
      newMoves,
      modifyDisplay(display, button4),
      solution.concat([button4]),
      "Pressed 4"
    );
    if (solutionD?.display == goal) {
      return solutionD;
    }

    let solutionE = pressButton(
      newMoves,
      modifyDisplay(display, button5),
      solution.concat([button5]),
      "Pressed 5"
    );
    if (solutionE?.display == goal) {
      return solutionE;
    }
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
    case operators.function:
      display = button.func(display);
      break;
    case operators.flipSign:
      display = +display * -1;
      break;
    case operators.shift:
      display = shiftDisplay(display + "", button.direction);
      break;
  }
  return display + "";
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
