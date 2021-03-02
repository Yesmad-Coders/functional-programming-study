const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

console.log(
  FUNCTIONAL.filter(users, function (user) {
    return user.id == 3;
  })[0]
);
// { id: 3, name: "BJ", age: 32 }
