// 코드 1-15 화살표 함수와 함께
// ES6
const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

console.log(
  FUNCTIONAL.logLength(
    FUNCTIONAL.map(
      FUNCTIONAL.filter(users, (u) => u.age < 30),
      (u) => u.age
    )
  )
);

console.log(
  FUNCTIONAL.logLength(
    FUNCTIONAL.map(
      FUNCTIONAL.filter(users, (u) => u.age >= 30),
      (u) => u.name
    )
  )
);

// 아래 코드도 괜찮다.
var under30 = (u) => u.age < 30;
var over30 = (u) => u.age >= 30;

console.log(
  FUNCTIONAL.logLength(
    FUNCTIONAL.map(FUNCTIONAL.filter(users, under30), (u) => u.age)
  )
);
console.log(
  FUNCTIONAL.logLength(
    FUNCTIONAL.map(FUNCTIONAL.filter(users, over30), (u) => u.name)
  )
);

// 아래 코드 또한 괜찮다.
var ages = (list) => FUNCTIONAL.map(list, (v) => v.age);
var names = (list) => FUNCTIONAL.map(list, (v) => v.name);

console.log(FUNCTIONAL.logLength(ages(FUNCTIONAL.filter(users, under30))));
console.log(FUNCTIONAL.logLength(names(FUNCTIONAL.filter(users, over30))));

// 마지막으로 수정해보자.
var bvalues = (key) => (list) => FUNCTIONAL.map(list, (v) => v[key]);
var ages = bvalues("age");
var names = bvalues("name");
var under30 = function (u) {
  return u.age < 30;
};
var over30 = function (u) {
  return u.age >= 30;
};

console.log(ages(FUNCTIONAL.filter(users, under30)));

console.log(FUNCTIONAL.logLength(ages(FUNCTIONAL.filter(users, under30))));
console.log(FUNCTIONAL.logLength(names(FUNCTIONAL.filter(users, over30))));

// bvalues는 이렇게 할 수 있다. - 라스트
// function bvalue(key) {
//   var value = bvalue(key);
//   return function (list) {
//     return map(list, value);
//   };
// }
