const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

console.log(
  FUNCTIONAL.findIndex(users, FUNCTIONAL.bmatch({ name: "JM", age: 32 }))
); // 5
console.log(FUNCTIONAL.findIndex(users, FUNCTIONAL.bmatch({ age: 36 }))); // -1
