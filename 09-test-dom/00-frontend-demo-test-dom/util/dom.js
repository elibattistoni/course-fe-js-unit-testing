export function showError(message) {
  // select error container
  const errorContainerElement = document.getElementById("errors");

  // create element and insert text in it
  const errorMessageElement = document.createElement("p");
  errorMessageElement.textContent = message;

  // clear the error container
  errorContainerElement.innerHTML = "";
  errorContainerElement.append(errorMessageElement);
}
