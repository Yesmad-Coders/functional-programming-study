const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

console.log(FUNCTIONAL.findByAge(users, 28)); // { id: 3, name: "BJ", age: 32 }
console.log(FUNCTIONAL.findByAge(users, 25)); // { id: 5, name: "JE", age: 27 }
