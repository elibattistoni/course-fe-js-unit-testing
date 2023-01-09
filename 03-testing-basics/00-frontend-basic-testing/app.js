import { extractNumbers } from "./src/parser.js";
import {
  validateStringNotEmpty,
  validateNumber,
} from "./src/util/validation.js";
import { add } from "./src/math.js";
import { transformToNumber } from "./src/util/numbers.js";

//% NB if you are using native ES modules without any transpiler or without any builtin tool like Webpack,
//% then in your main code you have to add the file extension in your import statements (this is how ECMAScript modules work,
//% if you are not using any special tool like Webpack that gets rid of that in the end)

const form = document.querySelector("form");
const output = document.getElementById("result");

function formSubmitHandler(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const numberInputs = extractNumbers(formData);

  let result = "";

  try {
    const numbers = [];
    for (const numberInput of numberInputs) {
      validateStringNotEmpty(numberInput);
      const number = transformToNumber(numberInput);
      validateNumber(number);
      numbers.push(number);
    }
    result = add(numbers).toString();
  } catch (error) {
    result = error.message;
  }

  let resultText = "";

  if (result === "invalid") {
    resultText = "Invalid input. You must enter valid numbers.";
  } else if (result !== "no-calc") {
    resultText = "Result: " + result;
  }

  output.textContent = resultText;
}

form.addEventListener("submit", formSubmitHandler);
