import jwt from "jsonwebtoken";
//| the two functions do the same thing: they generate a json web token (i.e. a kind of hashed string that can be used for authentication purposes)
//| based on some input that is encoded into the token and some secret that is used for signin

//| NB asynchronous code == code that might take a bit longer to finish and that should not block other operations from finishing first

//| NB asynchronous code in JS is typically implemented with: 1) callback functions, or 2) Promises (or async await)
//| 1) callback functions --> functions that are accepted as parameters and which are then executed in the future once a certain (potentially) longer taking operation is done
//| 2) promises --> async await (promises under the hood) --> the more modern way of dealing with async code

//| function that uses a callback!
export function generateToken(userEmail, doneFn) {
  jwt.sign({ email: userEmail }, "secret123", doneFn);
}

//| function that uses a promise!
export function generateTokenPromise(userEmail) {
  const promise = new Promise((resolve, reject) => {
    jwt.sign({ email: userEmail }, "secret123", (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });

  return promise;
}

// generateToken('test@test.com', (err, token) => {
//   console.log(token);
// });

// generateTokenPromise('test@test.com').then((token) => console.log(token));
