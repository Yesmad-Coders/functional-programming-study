// 코드 1-14. bvalue로 map의 iteratee 만들기

console.log(
  log_length(
    map(filter(users, function (user) { return user.age < 30;}),
    bvalue("age"))));

console.log(
  log_length(
    map(filter(users, function (user) { return user.age >= 30; }),
      bvalue("name"))));
