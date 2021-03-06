//write code example in book

//code 1-1

let result;

function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

result = addMaker(10)(5);
console.log(result); //15

//code 1-2
const add5 = addMaker(5);
result = add5(3);
console.log(result); //8

//code 1.5 for문으로 필터링하기
const users = [
  { id: 1, name: 'ID', age: 32 },
  { id: 2, name: 'HA', age: 25 },
  { id: 3, name: 'BJ', age: 32 },
  { id: 4, name: 'PJ', age: 28 },
  { id: 5, name: 'JE', age: 27 },
  { id: 6, name: 'JM', age: 32 },
  { id: 7, name: 'JE', age: 24 },
];

let temp_users = [];
for (let i = 0, len = users.length; i < len; i++) {
  if (users[i].age < 30) temp_users.push(users[i]);
}
console.log(temp_users.length); //4

let ages = [];
for (let i = 0, len = temp_users.length; i < len; i++) {
  ages.push(temp_users[i].age);
}
console.log(ages); //(4) [25, 28, 27, 24]

temp_users = [];
for (let i = 0, len = users.length; i < len; i++) {
  if (users[i].age >= 30) temp_users.push(users[i]);
}
console.log(temp_users.length); //3

let names = [];
for (let i = 0, len = temp_users.length; i < len; i++) {
  names.push(temp_users[i].name);
}
console.log(names); //(3) ["ID", "BJ", "JM"]

//1.6 filter
function filter(list, predicate) {
  let new_list = [];
  for (let i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}

//1.7 filter 사용
let users_under_30 = filter(users, function (user) {
  return user.age < 30;
});
console.log(users_under_30.length); //4

ages = [];
for (var i = 0, len = users_under_30.length; i < len; i++) {
  ages.push(users_under_30[i].age);
}
console.log(ages); //[25, 28, 27, 24]

let users_over_30 = filter(users, function (user) {
  return user.age > 30;
});
console.log(users_over_30.length); //3

names = [];
for (var i = 0, len = users_over_30.length; i < len; i++) {
  names.push(users_over_30[i].name);
}
console.log(names); //["ID", "BJ", "JM"]
