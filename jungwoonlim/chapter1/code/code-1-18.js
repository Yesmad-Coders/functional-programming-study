const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

console.log(FUNCTIONAL.findById(users, 3)); // { id: 3, name: "BJ", age: 32 }
console.log(FUNCTIONAL.findById(users, 5)); // { id: 5, name: "JE", age: 27 }
