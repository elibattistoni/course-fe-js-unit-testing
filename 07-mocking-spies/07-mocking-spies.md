# Spies and mocks: dealing with Side Effects

NodeJS project (but it does not matter -- you can have side effects no matter if you are on the backend or on the frontend)

cfr io.js and io.test.js + data.js

# IMPORTANT
A feature that is supported by both Jest and VItest: add a special folder to your project: the **__mocks__** folder.

This is a special folder name that Vitest or Jest will search whenever we call .mock() in a test file.
In this folder, we can add files that have the names of the modules that we want to mock (e.g. fs.js if we want to provide our own implementation of the file system module)

So the auto-mocking algorithm used by Vitest and Jest looks for such __mocks__ folder, and uses your implementation that you provide in the files in this folder; only if it does not find one, it will automatically replace everything with empty functions