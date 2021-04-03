const users = require("./data/users");

// 코드 1-12. filter, map
function filter(list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}
function map(list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]));
  }
  return new_list;
}
function log_length(value) {
  console.log(value.length);
  return value;
}
console.log(
  log_length(
    map(
      filter(users, function (user) {
        return user.age < 30;
      }),
      function (user) {
        return user.age;
      }
    )
  )
);
console.log(
  log_length(
    map(
      filter(users, function (user) {
        return user.age >= 30;
      }),
      function (user) {
        return user.age;
      }
    )
  )
);
