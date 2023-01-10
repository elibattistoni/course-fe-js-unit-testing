import jwt from "jsonwebtoken";
//| the two functions do the same thing: they generate a json web token (i.e. a kind of hashed string that can be used for authentication purposes)
//| based on some input that is encoded into the token and some secret that is used for signin

//| function that uses a callback
export function generateToken(userEmail, doneFn) {
  jwt.sign({ email: userEmail }, "secret123", doneFn);
}

//| function that uses a promise
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
