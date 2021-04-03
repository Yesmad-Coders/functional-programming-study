const users = require("./data/users");
const filter = require("./data/filter");

// 코드 1-7. filter 사용

// (1)
//predicate
var users_under_30 = filter(users, function (user) {
  return user.age < 30;
});
console.log(users_under_30.length); // 4

var ages = [];
for (var i = 0, len = users_under_30.length; i < len; i++) {
  ages.push(users_under_30[i].age);
}
console.log(ages); // [25,28,27,24]

// (2)
var users_over_30 = filter(users, function (user) {
  return user.age >= 30;
});
console.log(users_over_30.length); // 3

var names = [];
for (var i = 0, len = users_over_30.length; i < len; i++) {
  names.push(users_over_30[i].name);
}
console.log(names); // [ 'ID', 'BJ', 'JM' ]
