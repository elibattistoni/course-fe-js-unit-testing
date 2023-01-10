export function extractNumbers(formData) {
  const num1Input = formData.get("num1");
  const num2Input = formData.get("num2");

  return [num1Input, num2Input];
}

//| NB this function has one special thing: it uses a feature that is built in the browser: the formData object

export function extractEnteredNumberValues(form) {
  const formData = new FormData(form);
  const numberInputs = extractNumbers(formData);
  return numberInputs;
}
