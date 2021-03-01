// 코드 1-9 map 사용
// filter
function filter(list, predicate) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) newList.push(list[i]);
  }
  return newList;
}

// map
function map(list, iteratee) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    newList.push(iteratee(list[i]));
  }
  return newList;
}

var usersUnder30 = filter(users, function (user) {
  return user.age < 30;
});
console.log(usersUnder30.length); // 4

var ages = map(userUnder30, function (user) {
  return user.age;
});
console.log(ages); // [25, 28, 27, 24]

var usersOver30 = filter(users, function (user) {
  return user.age >= 30;
});
console.log(usersOver30.length); // 3

var names = map(usersOver30, function (user) {
  return user.name;
});
console.log(names); // ["ID", "BJ", "JM"]
