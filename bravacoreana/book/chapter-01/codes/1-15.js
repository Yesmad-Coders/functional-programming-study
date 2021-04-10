// 코드 1-15. 화살표 함수와 함께

const log_length = require("./data/log_length");
const users = require("./data/users");
const map = require("./data/map");
const filter = require("./data/filter");
const bvalue = require("./data/bvalue");

// ES6
console.log(
  "No1",
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
  "No2",
  log_length(
    map(
      filter(users, (u) => u.age >= 30),
      (u) => u.name
    )
  )
);
// 3
// ["ID", "BJ", "JM"]

// 이것도 괜찮다
var under_30 = (u) => u.age < 30;
var over_30 = (u) => u.age >= 30;

console.log("No3", log_length(map(filter(users, under_30), (u) => u.age)));
// 4
// [25, 28, 27, 24]

console.log("No4", log_length(map(filter(users, over_30), (u) => u.name)));
// 3
// ["ID", "BJ", "JM"]

// // 아니면 이것도 괜찮다
var ages = (list) => map(list, (v) => v.age);
var names = (list) => map(list, (v) => v.name);

console.log("No5", log_length(ages(filter(users, under_30))));
// 4
// [25, 28, 27, 24]
console.log("No6", log_length(names(filter(users, over_30))));
// 3
// ["ID", "BJ", "JM"]

// 마지막으로 한 번만 고쳐보자
var bvalues = (key) => (list) => map(list, (v) => v[key]);
var ages = bvalues("age");
var names = bvalues("name");
// bvalue가 있으면 화살표 함수가 아니어도 충분히 간결해진다

function bvalues(key) {
  return function (list) {
    return map(list, function (v) {
      return v[key];
    });
  };
}

var ages = bvalues("age");
var names = bvalues("name");
var under_30 = function (u) {
  return u.age < 30;
};
var over_30 = function (u) {
  return u.age >= 30;
};

console.log("No7", log_length(ages(filter(users, under_30))));
// 4
// [25, 28, 27, 24]
console.log("No8", log_length(names(filter(users, over_30))));
// 3
// ["ID", "BJ", "JM"]

// bvalue는 이렇게도 할 수 있다. (진짜 마지막!)
function bvalues(key) {
  var value = bvalue(key);
  return function (list) {
    return map(list, value);
  };
}
