const FUNCTIONAL = require("./functional.module.js");

var users2 = FUNCTIONAL.users2;

console.log(FUNCTIONAL.findBy("age", users2, 25)); // undefined
