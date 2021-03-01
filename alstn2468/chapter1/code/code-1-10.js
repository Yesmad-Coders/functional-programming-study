const filter = require('./common/filter');
const map = require('./common/map');
const users = require('./common/users');

var ages = map(
  filter(users, function (user) {
    return user.age < 30;
  }),
  function (user) {
    return user.age;
  }
);
console.log(ages.length); // 4
console.log(ages); // [25, 28, 27, 24]

var names = map(
  filter(users, function (user) {
    return user.age >= 30;
  }),
  function (user) {
    return user.name;
  }
);
console.log(names.length); // 3
console.log(names); // ["ID", "BJ", "JM"]
