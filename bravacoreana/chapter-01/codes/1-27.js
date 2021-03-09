const users = require("./data/users");
const find = require("./data/find");

function object(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
}

function match(obj, obj2) {
  for (var key in obj2) {
    if (obj[key] !== obj2[key]) return false;
  }
  return true;
}

function bmatch(obj2, val) {
  if (arguments.length == 2) {
    obj2 = object(obj2, val);
  }
  return function (obj) {
    return match(obj, obj2);
  };
}

console.log(
  match(find(users, bmatch("id", 3)), find(users, bmatch("name", "BJ")))
);
// true;

console.log(find(users, bmatch({ name: "JM", age: 32 })));
// { id: 6, name: 'JM', age: 32

console.log(
  find(users, function (u) {
    return u.age == 32 && u.name == "JM";
  })
);
// { id: 6, name: 'JM', age: 32

console.log(find(users, bmatch({ name: "JM", age: 32 })));
// { id: 6, name: 'JM', age: 32
