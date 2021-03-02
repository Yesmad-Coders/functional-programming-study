const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;
var users2 = FUNCTIONAL.users2;

console.log(
  FUNCTIONAL.map(
    FUNCTIONAL.filter(users, function (u) {
      return u.age >= 30;
    }),
    function (u) {
      return u.name;
    }
  )
);
// ["ID", "BJ", "JM"];

// 코드 1-22에서 선언한 users2로 교체
console.log(
  FUNCTIONAL.map(
    FUNCTIONAL.filter(users2, function (u) {
      return u.getAge() > 30;
    }), // 메서드 실행으로 변경
    function (u) {
      return u.getName();
    }
  )
); // 메서드 실행으로 변경
// ["ID", "BJ", "JM"];
