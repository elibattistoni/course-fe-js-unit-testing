What kind of code should and should not be tested? In this section we will learn how to write good tests, because you don't want to write just any kind of tests.
Thjere are certain things in your application code that you do not want to test with your tests.


# WHAT to test and what not to test
IMPORTANT IMPORTANT you should only test your code --> DO NOT TEST ANY CODE COMING FROM THIRD-PARTY LIBRARIES / PACKAGES / FRAMEWORKS / FEATURES that are built into the environment you are working with ==> DO NOT TEST WHAT YOU CANNOT CHANGE (e.g. do not test whether .querySelector() works technically --> NB these features could have bugs, but it is not your job to fix those bugs)

e.g. do not test whether the fetch() browser API for HTTP requests works as intended!

IMPORTANT do not test the server-side (backend) code implicitly via your client-side code
insteadm write separate tests for your backend code
what you want to test in your frontend project is your reaction to the response that you get back when you are sending a request (==> DO TEST YOUR CLIENT-SIDE REACTION TO DIFFERENT RESPONSES & ERRORS)

# Writing Good Tests
1. be careful on what to test and what not to test
2. follow the AAA Arrange - Act - Assert Pattern, which helps you keep your testing code organized, structured, and understandable --> it also helps you writing simple, basic tests, which is something that you always want to do
3. your tests should typically test only one thing! do not write a test that tests > 1 different aspects of a function, or > 1 different functions altogether --> because when a test fails, it is clear which behavior or which expected outcome did not work (if you have multuple things that you are testing in 1 test, if that test fails, it is not clear for which reasons it failed)
4. keep your tests basic and simple and focus on the essence of a test when arranging
5. keep your number of assertsions (expect statements) low (if high, there is a higher probability that you are testing more than one thing)

### What exactly is "one thing"?
one thing == one feature == one behavior that I want to test per test, e.g. validate input OR transforming it (do not do both things together in one test); validate a string for being empty and for having enough characters in different tests --> try to be as granular as possible

# Code Coverage
An important aspect of testing is to achieve good code coverage. This means, that you want to write tests for the majority of your code (both code files and line of code).
There are tools that help you measure your code coverage - actually Vitest comes with a built-in functionality: https://vitest.dev/guide/features.html#coverage
It is worth noting though, that the goal is not necessarily 100% coverage. There always can be some code that doesn't need any tests (e.g., because it merely calls other functions that are tested already).
In addition, achieving (close to) full code coverage also isn't any guarantee that you wrote good tests. You could cover 100% of your code with meaningless tests after all. Or you could missing important tests (that should test important behaviors). The code would still technically be covered by tests in such scenarios.
So don't see a high amount of code coverage as the ultimate goal!