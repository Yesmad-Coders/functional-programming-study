const filter = require('./common/filter');
const map = require('./common/map');
const log_length = require('./common/log_length');
const bvalue = require('./common/bvalue');
const users = require('./common/users');

// ES6
console.log(
  log_length(
    map(
      filter(users, (u) => u.age < 30),
      (u) => u.age
    )
  )
);
// 4
// [25, 28, 27, 24]

console.log(
  log_length(
    map(
      filter(users, (u) => u.age >= 30),
      (u) => u.name
    )
  )
);
// 3
// ["ID", "BJ", "JM"]

var under_30 = (u) => u.age < 30;
var over_30 = (u) => u.age >= 30;

console.log(log_length(map(filter(users, under_30), (u) => u.age)));
// 4
// [25, 28, 27, 24]
console.log(log_length(map(filter(users, over_30), (u) => u.name)));
// 3
// ["ID", "BJ", "JM"]

var ages = (list) => map(list, (v) => v.age);
var names = (list) => map(list, (v) => v.name);

console.log(log_length(ages(filter(users, under_30))));
// 4
// [25, 28, 27, 24]
console.log(log_length(names(filter(users, over_30))));
// 3
// ["ID", "BJ", "JM"]

var bvalues = (key) => (list) => map(list, (v) => v[key]);
var ages = bvalues('age');
var names = bvalues('name');

function bvalues(key) {
  return function (list) {
    return map(list, function (v) {
      return v[key];
    });
  };
}
var ages = bvalues('age');
var names = bvalues('name');
var under_30 = function (u) {
  return u.age < 30;
};
var over_30 = function (u) {
  return u.age >= 30;
};
console.log(log_length(ages(filter(users, under_30))));
// 4
// [25, 28, 27, 24]
console.log(log_length(names(filter(users, over_30))));
// 3
// ["ID", "BJ", "JM"]

function bvalues(key) {
  var value = bvalue(key);
  return function (list) {
    return map(list, value);
  };
}
