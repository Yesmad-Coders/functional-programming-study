const find = require('./common/find');
const users = require('./common/users');
const users2 = require('./common/users2');

console.log(
  find(users2, function (u) {
    return u.getAge() == 25;
  }).getName()
); // HA
console.log(
  find(users, function (u) {
    return u.name.indexOf('P') != -1;
  })
); // { id: 4, name: "PJ", age: 28 }
console.log(
  find(users, function (u) {
    return u.age == 32 && u.name == 'JM';
  })
); // { id: 6, name: "JM" age: 32 }
console.log(
  find(users2, function (u) {
    return u.getAge() < 30;
  }).getName()
); // HA
