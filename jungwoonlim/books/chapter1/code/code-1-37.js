const FUNCTIONAL = require("./functional.v2.module.js");

FUNCTIONAL.compose;

var greet = function (name) {
  return `hi: ${name}`;
};
var exclaim = function (statement) {
  return `${statement.toUpperCase()}!`;
};
var welcome = FUNCTIONAL.compose(greet, exclaim);

var output = welcome("moe");

console.log(output); // 'hi: MOE!'
