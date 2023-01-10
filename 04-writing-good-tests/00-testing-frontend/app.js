//| NB this app.js file uses some builtin browser features and browser APIs + it is probably our most complex JS file that does many different things

import { extractEnteredNumberValues } from "./src/parser.js";
import { calculateResult } from "./src/math.js";
import { generateResultText, outputResult } from "./src/output.js";

//| IMPORTANT let's split up this big function into multiple functions --> try to avoid complex functions like this one
//| instead, you might want to call a bunch of other functions in that function
//| and those other functions do the individual tasks that need to be done, like getting the input, validating the input, etc
//| as a result, this function will get a bit more readable and maintainable, and your tests will become more manageable as well (you will be able to have more granular tests)
//| therefore testing kind of forces you to write better application code (this is a benefit of having tests, that you are forced to write cleaner code)
const form = document.querySelector("form");

/*
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
*/

const formSubmitHandler = (e) => {
  e.preventDefault();

  const numberValues = extractEnteredNumberValues(form);
  console.log("numberValues", numberValues);

  const result = calculateResult(numberValues);
  console.log("result", result);

  const resultText = generateResultText(result);
  console.log("resultText", resultText);

  outputResult(resultText);
};

form.addEventListener("submit", formSubmitHandler);
