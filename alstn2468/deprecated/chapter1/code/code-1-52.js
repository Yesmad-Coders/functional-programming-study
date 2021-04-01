const _ = require('./lib/underscore');
function callWith(val1) {
  return function (val2, func) {
    return func(val1, val2);
  };
}
console.log(
  callWith([1, 2, 3])(function (v) {
    return v * 10;
  }, _.map)
); // [10, 20, 30]

_.get = function (list, idx) {
  return list[idx];
};

var callWithUsers = callWith([
  { id: 2, name: 'HA', age: 25 },
  { id: 4, name: 'PJ', age: 28 },
  { id: 5, name: 'JE', age: 27 },
]);

console.log(callWithUsers(2, _.get)); // { id: 5, name: "JE", age: 27 }
console.log(
  callWithUsers(function (user) {
    return user.age > 25;
  }, _.find)
); // { id: 4, name: "PJ", age: 28 }
console.log(
  callWithUsers(function (user) {
    return user.age > 25;
  }, _.filter)
); // [ { id: 4, name: "PJ'"" age: 28 }, { id: 5, name: "JE", age: 27 } ]
console.log(
  callWithUsers(function (user) {
    return user.age > 25;
  }, _.some)
); // true
console.log(
  callWithUsers(function (user) {
    console.log(user);
    return user.age > 25;
  }, _.every)
); // false
