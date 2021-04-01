const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;
var users2 = FUNCTIONAL.users2;

console.log(
  FUNCTIONAL.find(users2, function (u) {
    return u.getAge() == 25;
  }).getName()
);
// HA
console.log(
  FUNCTIONAL.find(users, function (u) {
    return u.name.indexOf("P") !== -1;
  })
);
// { id: 4, name: "PJ", age: 28 }
console.log(
  FUNCTIONAL.find(users, function (u) {
    return u.age === 32 && u.name == "JM";
  })
);
// { id: 6, name: "JM", age: 32 }
console.log(
  FUNCTIONAL.find(users2, function (u) {
    return u.getAge() < 30;
  }).getName()
);
// HA
