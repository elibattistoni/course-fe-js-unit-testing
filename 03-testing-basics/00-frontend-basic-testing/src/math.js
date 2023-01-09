export function add(numbers) {
  let sum = 0;

  for (const number of numbers) {
    sum += +number;
    //| with the + you convert all the elements to a number before adding them to the sum
  }
  return sum;
}

//% this add function is the unit that we want to test
//| (in the vast majority of cases, units are functions)
//| you want to test functions that do not call other functions --> these are our units

//| NB Vitest supports also writing your tests in the same file as your main code is (this is called "in-source testing")
//| for now we will ignore this feature because JEST does not have it
//| so let's do what we typically do: add a new file named IMPORTANT math.test.js or math.spec.js
//| and once you execute it, your test runner (Vitest or JEST) will automatically see that this is a testing file that contains tests,
//| and it will execute any test you write in that file
