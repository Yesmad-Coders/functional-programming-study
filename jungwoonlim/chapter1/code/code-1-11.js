// 코드 1-11 함수 중첩2
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
// 4
// [25, 28, 27, 24]

console.log(
  logLength(
    map(
      filter(users, function (user) {
        return user.age >= 30;
      }),
      function (user) {
        return user.name;
      }
    )
  )
);
// 3
// ["ID", "BJ", "JM"]
