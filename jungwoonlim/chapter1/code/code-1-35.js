const FUNCTIONAL = require("./functional.v2.module.js");

FUNCTIONAL.some = function (list) {
  return !!FUNCTIONAL.find(list, FUNCTIONAL.identity);
};

FUNCTIONAL.every = function (list) {
  return FUNCTIONAL.beq(-1)(FUNCTIONAL.findIndex(list, FUNCTIONAL.not));
};

console.log(FUNCTIONAL.some([0, null, 2])); // true;
console.log(FUNCTIONAL.some([0, null, false])); // false;

console.log(FUNCTIONAL.every([0, null, 2])); // false;
console.log(FUNCTIONAL.every([{}, true, 2])); // true;
