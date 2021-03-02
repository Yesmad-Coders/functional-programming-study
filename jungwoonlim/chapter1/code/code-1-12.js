// 코드 1-12 filter, map
const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

console.log(
  FUNCTIONAL.logLength(
    FUNCTIONAL.map(
      FUNCTIONAL.filter(users, function (user) {
        return user.age < 30;
      }),
      function (user) {
        return user.age;
      }
    )
  )
);

console.log(
  FUNCTIONAL.logLength(
    FUNCTIONAL.map(
      FUNCTIONAL.filter(users, function (user) {
        return user.age >= 30;
      }),
      function (user) {
        return user.name;
      }
    )
  )
);
