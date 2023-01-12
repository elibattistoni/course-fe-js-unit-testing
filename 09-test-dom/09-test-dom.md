# Accessing the DOM from inside tests

In this section we will see how to handle DOM side effects in testing: we will implement a different type of mocking, because we will see how to test code that interacts with the DOM.

For this, we will learn about using different testing environments:
1) browser-side or DOM supporting testing environments
2) vs
3) Node JS environments

And we will learn how we can access the DOM from inside our tests or how we can test functions that access the DOM.

We will also see some specialized libraries that make working with the DOM in our tests much easier.


See **dom.js** and **dom.test.js**

## Testing Library (package)
third party library that you can use in conjunction with Jest or Vitest

https://testing-library.com/

