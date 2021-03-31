// 코드 1-11 함수 중첩2
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
// 4
// [25, 28, 27, 24]

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
// 3
// ["ID", "BJ", "JM"]
