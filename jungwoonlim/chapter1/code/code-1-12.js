// 코드 1-12 filter, map
function filter(list, predicate) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) newList.push(list[i]);
  }
  return newList;
}

function map(list, iteratee) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    newList.push(iteratee(list[i]));
  }
  return newList;
}

function logLength(value) {
  console.log(value.length);
  return value;
}

console.log(
  logLength(
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
  logLength(
    map(
      filter(user, function (user) {
        return user.age >= 30;
      }),
      function (user) {
        return user.name;
      }
    )
  )
);
