const FUNCTIONAL = require("./functional.v2.module.js");

function callWith10(val, func) {
  return func(10, val);
}

callWith10(20, FUNCTIONAL.add); // 30
callWith10(5, FUNCTIONAL.sub); // 5
