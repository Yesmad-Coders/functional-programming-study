const FUNCTIONAL = require("./functional.v2.module.js");

FUNCTIONAL.some = function (list) {
  return FUNCTIONAL.not(FUNCTIONAL.not(FUNCTIONAL.positive(list)));
};

FUNCTIONAL.every = function (list) {
  return FUNCTIONAL.beq(-1)(FUNCTIONAL.negativeIndex(list));
};

console.log(FUNCTIONAL.some([0, null, 2])); // true
console.log(FUNCTIONAL.some([0, null, false])); // false
console.log(FUNCTIONAL.every([0, null, 2])); // false
console.log(FUNCTIONAL.every([{}, true, 2])); // true
