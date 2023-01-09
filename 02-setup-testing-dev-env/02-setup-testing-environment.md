We can merge the testing setup and the testing configuration into the main project (whether it is a JS, NodeJS, NextJS or React project)

Now, your project setup (without the testing parts) will typically also include some configuration and some extra tools. For example, you might be using Webpack, or Vite, or Babel to optimize and transform your code. And the exact set up depends on the project you have. And very often, you don't create that project configuration on your own, but instead, you use some tool, like the create react app tool or the angular CLI, to create a project that comes with a certain configuration out of the box so that you can focus on the actual code you write.

But then, if you want to add automated tests, you need extra tools that are added to this project, e.g.: you need to add:
- a **test runner** --> a tool that executes your testing code (becuase the testing code is not part of your main application code and should not be executed together with the main app code) --> the test runner typically detects automatically your testing code (as long as you place your testing code in certain files that follow a certain naming schema) + is also responsible of executing your tests, gathering the results of these tests, and displaying the results of these tests. There are different test runner tools that you can add, it depends on the programming language that you are using (and you have multiple choices for a single programming language) --> e.g. Jest, Karma
- an **assertion library** --> this is needed to define what makes a test successful or not, i.e. you need a way of defining expectations, expected results, what is treated as a success and what is treated as a failure --> NB with assertion libraries you can define your expected outcomes, and the assertion library then checks if the code that is tested actually produces a result that matches those expectations (good assertion libraries should support all kinds of possible outcomes and situations, including synchronous and asynchronous code, etc) --> e.g. Jest, Chai

--> Jest supports both the test runner functionality + the assertion library functionality --> great because it means that you only have to install and configure one tool for defining and running the tests

# NB what you learn in this course applies to any kind of JavaScript / TypeScript project!!

# Jest and Vitest
React projects that are created with create-react-app or Angular projects that are created with the Angular CLI, typically already have a full testing workflow builtin, and you can dive right into writing tests.

But for some projects, you might not have a predefined testing configuration workflow, e.g. if it is a NodeJS backend project or also some other frontend project --> you then need both a test runner and a assertion library --> you have to add these to your porject setup and that you need to configure in a way that it works for your project setup

**JEST** is a very populat tool for testing and you can use it for any kind of projects. --> you can install JEST via `npm install --save-dev jest` (to install it e.g. in a Node Express application) --> `npm test` starts Jest as a "Test Runner", while its "Assertion library" features were used while evaluating the test files.

JEST --> DISADVANTAGES & DOWNSIDES --> it can be slow, especially if you have a project that uses ES modules (i.e. that uses not common JS that i.e. use the import export statements -- which can be used both for frontend apps and node projects)

Setting it up and making it work with the workourounds suggested in the docs (https://jestjs.io/docs/ecmascript-modules) can be very annoying and you often end up installing extra tools and you set up an extra workflow for testing, where the code gets transpiled and changed behind the scenes, which is always a bit annoying if your main code works just like that, without any extra setup, and you then need some extra configuration just to make your tests work. That's not really the idea behind testing. You don't wanna test something different than you run in production, even though it's just a behind the scenes transpolation --> so Jest does have its downsides, even though it's very popular.

In this course we are going to use **Vitest** (test runner + assertion library) --> pretty new and popular, all ready tool that allows you to define and run tests and it is compatible with the JEST syntax. It has an API that allows you to write tests basically in the same way you would write them for JEST + some extra convenience features that are really nice to have. And it works with ES modules out of the box, it works with common JS

--> to install vitest: `npm install --save-dev vitest`

in package.json, in the scripts, you can have:

"scripts" : {
    "test": "vitest --globals"
}
NB the --global flag just makes sure that you can use special functions like "it" or "expect" without any extra imports

