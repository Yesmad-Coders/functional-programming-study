// 코드 1-9 map 사용
const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

var usersUnder30 = FUNCTIONAL.filter(users, function (user) {
  return user.age < 30;
});
console.log(usersUnder30.length); // 4

var ages = FUNCTIONAL.map(usersUnder30, function (user) {
  return user.age;
});
console.log(ages); // [25, 28, 27, 24]

var usersOver30 = FUNCTIONAL.filter(users, function (user) {
  return user.age >= 30;
});
console.log(usersOver30.length); // 3

var names = FUNCTIONAL.map(usersOver30, function (user) {
  return user.name;
});
console.log(names); // ["ID", "BJ", "JM"]
