const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

console.log(FUNCTIONAL.findByName(users, "BJ")); // { id: 3, name: "BJ", age: 32 }
console.log(FUNCTIONAL.findByName(users, "JE")); // { id: 5, name: "JE", age: 27 }
