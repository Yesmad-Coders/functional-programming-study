const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

console.log(FUNCTIONAL.find(users, FUNCTIONAL.bmatch1("id", 1))); // { id: 1, name: "ID", age: 32 }
console.log(FUNCTIONAL.find(users, FUNCTIONAL.bmatch1("name", "HI"))); // { id: 7, name: "HI", age: 24 }
console.log(FUNCTIONAL.find(users, FUNCTIONAL.bmatch1("age", 27))); // { id: 5, name: "JE", age: 27 }
