# What is testing?

TESTING === verify "if something works as intended"

MANUAL TESTING vs. AUTOMATED TESTING

**MANUAL TESTING** --> you should always do it, it is very important but it is tedious and cumbersome (especially if, whenever you make a small change, you always have to test all the features and all the different ways of using a website; and you usually want to test all these possible scenarios because maybe if you changed one part of a website some other part stops working) --> NB it is ERROR PRONE + OFTEN INCOMPLETE (you might forget something and not conver all the scenarios)

And that is where **AUTOMATED TESTING** comes into play: you write some code that tests your code. So you have some initial effort (to write tests), but no effort thereafter --> NB it is predictable and consistent + HIGH / COMPLETE CODE & SCENARIO COVERAGE CAN BE ACHIEVED

IMPORTANT you should always do both!


# Different kinds of automated testing
NB you should combine all these kinds of tests in your projects

### Unit Testing
One popular kind of testing is **unit testing**

UNIT === a building block of your app (ideally, these are the smallest possible building blocks) ==> functions, classes, or components (if you are working with a framework or library like React or Angular) ==> generally, functions ==> so when we speak of a unit, we mean a function

all these units (functions, classes) combined make up your application ==> app = combination of all units ==> the idea behind unit testing is that we write tests for these individual units that test these units stand alone, and if all units are tested, then the app should work.
However, we typically back them up with another kind of test: **integration tests**

### Integration Testing
Test the combination of building blocks, the combination of units --> verify that if different units are executed together or are working together, the overall app still works as intended --> the idea is that even if our building blocks work correctly individually, once we combine them, they might not work as expected anymore

### End-to-End (E2E) Testing
E2E tsting is a different kind of testing, which is not directly related to unit or integration testing.
The idea behind E2E testing is that you focus on specific user behaviors (or specific API interfaces your app might be providing), and you test entire flows, entire application features. e.g. if you are building an image upload API endpoint, you might want to test the entire image upload workflow, which includes extracting the image from the incoming request and then storing it on the file system --> with unittest, you would test the individual parts that make up the flow; with integration tests, you would test combinations of those blocks; with e2e tests, you would test the entire flow (test the actual things that real users would do)

### Accessibility Testing

### The testing workflow & the Testing Pyramid
1. UNIT TESTING --> quickly spot and pinpoint breaking changes and errors --> ignore actual user flows and interferences
+
1. INTEGRATION TESTING --> test (parts of) processes and combinations of units --> spotting the exact root of an error can be tricky
+
1. END-TO-END (E2E) TESTING --> test realistic user flows & behaviors --> covering all possible behaviors can be challenging


                / \
               /   \
              /     \
             /       \
            /   E2E   \
           /-----------\
          /             \
         /               \
        /  INTEGRATION    \
       /                   \
      /---------------------\
     /                       \
    /                         \
   /           UNIT            \
  /                             \
 /                               \
/                                 \
-----------------------------------
NB add a lot of unit tests --> test for all units that make up your app (all your functions and classes) --> and not just one test per unit, but instead multiple tests per unit

some integration tests

a couple of integration tests for the most important behaviors and processes in your app


# Test-Driven Development (TDD)
TDD is a framework / a philosophy for writing tests --> the idea behind TDD is that you do not write application code first and then some tests for that code, but instead that as a first test, before you write any app code, you write failing tests (where you define the expected behavior), then you implement the code that should be tested (which should be implemented in a way such that the behavior is met and the test therefore suceeds) --> then you can iteratively refactor and go through that flow over and over again, and write a new failing test whenever you want to add a new behavior or a new unit, then implement the logic, then maybe optimize the logic and so on...

This course is however not about TDD, but about learning the fundamentals; after learning these fundamentals, then you are ready to explore the concept of TDD.