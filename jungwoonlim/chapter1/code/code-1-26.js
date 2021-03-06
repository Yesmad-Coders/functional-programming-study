const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

console.log(FUNCTIONAL.filter(users, FUNCTIONAL.bmatch1("age", 32)));
// [{ id: 1, name: "ID", age: 32 },
//  { id: 3, name: "BJ", age: 32 },
//  { id: 6, name: "JM", age: 32 }]

console.log(FUNCTIONAL.map(users, FUNCTIONAL.bmatch1("age", 32)));
// [true, false, true, false, false, true, false]
