const FUNCTIONAL = require("./functional.v2.module.js");

console.log(FUNCTIONAL.callWith(30)(20, FUNCTIONAL.add)); // 50
console.log(FUNCTIONAL.callWith(20)(20, FUNCTIONAL.sub)); // 0
