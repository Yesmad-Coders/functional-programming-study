const users = require('./common/users');
const users2 = require('./common/users2');
const filter = require('./common/filter');
const map = require('./common/map');

console.log(
  map(
    filter(users, function (u) {
      return u.age >= 30;
    }),
    function (u) {
      return u.name;
    }
  )
); // ["ID", "BJ", "JM"]
console.log(
  map(
    filter(users2, function (u) {
      return u.getAge() > 30;
    }),
    function (u) {
      return u.getName();
    }
  )
); // ["ID", "BJ", "JM"]
