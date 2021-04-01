const FUNCTIONAL = require("./functional.v2.module.js");

console.log(
  FUNCTIONAL.filter([true, 0, 10, "a", false, null], FUNCTIONAL.identity)
); // [true, 10, 'a']
