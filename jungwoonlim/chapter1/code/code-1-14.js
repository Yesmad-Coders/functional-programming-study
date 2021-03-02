// 코드 1-14 bvalue로 map의 iteratee 만들기
const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

console.log(
  FUNCTIONAL.logLength(
    FUNCTIONAL.map(
      FUNCTIONAL.filter(users, function (user) {
        return user.age < 30;
      }),
      FUNCTIONAL.bvalue("age")
    )
  )
);

console.log(
  FUNCTIONAL.logLength(
    FUNCTIONAL.map(
      FUNCTIONAL.filter(users, function (user) {
        return user.age >= 30;
      }),
      FUNCTIONAL.bvalue("name")
    )
  )
);
