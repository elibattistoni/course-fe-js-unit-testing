# Integration tests

see numbers.js

Why integration tests are important? Because even if we test all units stand alone, and they all work correctly, we could be combining them such that they still do not work correctly in combination.
so the value of integration tests is that they allow us to test the combination of functions instead of just the functions standalone

# Finding the right balance between Unit Tests and Integration Tests
you should try to test as many stand-alone function as possible, but you should not start splitting your code into multiple stand-alone functions unnecessarily: you should not start to write one or two lines of functions; but be granular and write tests for those stand-alone functions because they will help you to really nail down errors if they occur, if your tests start failing. But you should then also in addition have integration tests where you test the combination of multiple functions with each other.