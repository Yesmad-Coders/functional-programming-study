const FUNCTIONAL = require("./functional.v2.module.js");

console.log(
  FUNCTIONAL.filter([1, 2, 3, 4], function (val, idx) {
    return idx > 1;
  })
); // [3, 4]

console.log(
  FUNCTIONAL.filter([1, 2, 3, 4], function (val, idx) {
    return idx % 2 == 0;
  })
); // [1, 3]
