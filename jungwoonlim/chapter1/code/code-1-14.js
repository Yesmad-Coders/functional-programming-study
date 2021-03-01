// 코드 1-14 bvalue로 map의 iteratee 만들기
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
      bvalue("age")
    )
  )
);

console.log(
  logLength(
    map(
      filter(users, function (user) {
        return user.age >= 30;
      }),
      bvalue("name")
    )
  )
);
