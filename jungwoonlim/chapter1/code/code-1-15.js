// 코드 1-15 화살표 함수와 함께
// ES6
const logLength = (value) => {
  console.log(value);
  return value;
};

console.log(
  logLength(
    map(
      filter(users, (u) => u.age < 30),
      (u) => u.age
    )
  )
);
console.log(
  logLength(
    map(
      filter(users, (u) => u.age >= 30),
      (u) => u.name
    )
  )
);

// 아래 코드도 괜찮다.
var under30 = (u) => u.age < 30;
var over30 = (u) => u.age >= 30;

console.log(logLength(map(filter(users, under30), (u) => u.age)));
console.log(logLength(map(filter(users, over30), (u) => u.name)));

// 아래 코드 또한 괜찮다.
var ages = (list) => map(list, (v) => v.age);
var names = (list) => map(list, (v) => v.name);

console.log(logLength(ages(filter(users, under30))));
console.log(logLength(names(filter(users, over30))));

// 마지막으로 수정해보자.
function bvalue(key) {
  return function (list) {
    return map(list, function (v) {
      return v[key];
    });
  };
}
var ages = bvalue("age");
var names = bvalue("name");
var under30 = function (u) {
  return u.age < 30;
};
var over30 = function (u) {
  return u.age >= 30;
};

console.log(logLength(ages(filter(users, under30))));
console.log(logLength(names(filter(users, over30))));

// bvalues는 이렇게 할 수 있다. - 라스트
function bvalue(key) {
  var value = bvalue(key);
  return function (list) {
    return map(list, value);
  };
}
