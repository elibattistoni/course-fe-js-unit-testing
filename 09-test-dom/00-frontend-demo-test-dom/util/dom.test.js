//| the showError function relies on the DOM
//| we rely on the existence of the document object and then we use this
//| document object and certain methods provided by that object to interact with the DOM
//| e.g. to select elements or create or add elements
//| and this can be a problem with tests, because:
//| 1. it is a side effect (but unlike working with the file system ot the db,
//| it would not be a side effect that causes persistent problems, because if
//| we add an element to an HTML document, it will be gone the next time the original
//| document is loaded -- so any changes made through JS will not persist if the page is loaded
//| i.e. it is not a persistent change) --> nonetheless it is a side effect,
//| therefore we might want to avoid working with the real DOM
//| 2. but the biggest problem is that when we run our tests with Jest or Vitest, we run them through npm
//| we are not using a browser, we run them inside of the command line
//| there is no browser, no HTML page and no DOM
//| but Jest and Vitest support the DOM virtually, out of the box

//| IMPORTANT when working with Vitest or Jest you can choose a testing environment in which your test code will be executed
//| NB OPTION 1: NodeJS (Default)
//| if you stick to that default as we did for this entire course
//| then you have access to all the NodeJS APIs and modules inside of your test files.
//| But you can't interact with the browser or browser specific APIs.
//| NB OPTION 2: JSDOM
//| it is a virtual DOM environment that is created by the test runner behind the scenes;
//| it still does not use the actual browser but it emulates that your code runs in a browser
//| and gives access to all these DOM and browser APIs
//| OPTION 3. Vitest also provides an alternative called Happy-DOM (same functionalities as JSDOM)

//| IMPORTANT to access this:
//| in package.json:
//| "test": "vitest --run --environment happy-dom"
//| "test": "vitest --run --environment jsdom"
//| you can also add a flag in the test file that you want to use the virtual dom -- see the official docs pages

import { it, vi, expect, beforeEach } from "vitest";
import { showError } from "./dom";

//% set up virtual DOM
//| IMPORTANT we need to initialize our index.html in order to access the structure that we defined
import fs from "fs";
import path from "path"; //| NB you can still use all the NodeJS code in our test files because the DOM is only emulated virtually
//| load our HTML
const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();
const window = new Window();
const document = window.document;
// document.write(htmlDocumentContent); // this renders the content in our virtual browser --> moved it into the beforeEach()
// stub the document globally with our custom document
vi.stubGlobal("document", document);

//| NB in this case you want to reset any changes that you made after every test or before every test
//| so that test specific effects do not spill over to other tests
//| so we add the writing of the document before each test
beforeEach(() => {
  document.body.innerHTML = ""; // clear the content before each test
  document.write(htmlDocumentContent); // this renders the content in our virtual browser
});

//% testing dom functionalities
it("should add an error paragraph to the id='errors' element", () => {
  showError("test"); // we could also pass nothing i.e showError() because testing the message is not the purpose of this test

  const errorsElement = document.getElementById("errors");

  const errorParagraph = errorsElement.firstElementChild;

  expect(errorParagraph).not.toBeNull();
});

it("should not contain an error paragraph initially", () => {
  const errorsElement = document.getElementById("errors");
  const errorParagraph = errorsElement.firstElementChild;
  expect(errorParagraph).toBeNull();
});

it("should output the provided message in the error paragraph", () => {
  const testErrorMessage = "test";

  showError(testErrorMessage);

  const errorsElement = document.getElementById("errors");
  const errorParagraph = errorsElement.firstElementChild;

  expect(errorParagraph.textContent).toBe(testErrorMessage);
});
