users = require("./data/users");
users2 = require("./data/users2");

function find(list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) return list[i];
  }
}

console.log(
  find(users2, function (u) {
    return u.getAge() == 25;
  }).getName()
); // HA
console.log(
  find(users, function (u) {
    return u.name.indexOf("P") != -1;
  })
); // { id: 4, name: 'PJ', age: 28 }
console.log(
  find(users, function (u) {
    return u.age == 32 && u.name == "JM";
  })
); // { id: 6, name: 'JM', age: 32 }
console.log(
  find(users2, function (u) {
    return u.getAge() < 30;
  }).getName()
); // HA
