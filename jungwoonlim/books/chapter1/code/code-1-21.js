const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

console.log(FUNCTIONAL.findBy("name", users, "BJ")); // { id: 3, name: "BJ", age: 32 }
console.log(FUNCTIONAL.findBy("id", users, 2)); // { id: 2, name: "HA", age: 25 }
console.log(FUNCTIONAL.findBy("age", users, 28)); // { id: 4, name: "PJ", age: 28 }
