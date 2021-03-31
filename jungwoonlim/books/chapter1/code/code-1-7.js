// 코드 1-7 filter 사용
const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

var usersUnder30 = FUNCTIONAL.filter(users, function (user) {
  return user.age < 30;
});
console.log(usersUnder30.length); // 4

var ages = [];
for (var i = 0, len = usersUnder30.length; i < len; i++) {
  ages.push(usersUnder30[i].age);
}
console.log(ages); // [25, 28, 27, 24]

var usersOver30 = FUNCTIONAL.filter(users, function (user) {
  return user.age >= 30;
});
console.log(usersOver30.length); // 3

var names = [];
for (var i = 0, len = usersOver30.length; i < len; i++) {
  names.push(usersOver30[i].name);
}
console.log(names); // ["ID", "BJ", "JM"]
