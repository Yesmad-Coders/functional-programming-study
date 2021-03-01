// 코드 1-5 for문으로 필터링하기
var users = [
  { id: 1, name: "ID", age: 32 },
  { id: 2, name: "HA", age: 25 },
  { id: 3, name: "BJ", age: 32 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
  { id: 6, name: "JM", age: 32 },
  { id: 7, name: "HI", age: 24 },
];

// one
var tempUsers = [];
for (var i = 0, len = user.length; i < len; i++) {
  if (users[i].age < 30) tempUsers.push(users[i]);
}
console.log(tempUsers.length); // 4

// two
var ages = [];
for (var i = 0, len = tempUsers.length; i < len; i++) {
  ages.push(tempUsers[i].age);
}
console.log(ages); // [25, 28, 27, 24]

// three
var tempUsers = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age >= 30) tempUsers.push(users[i]);
}
console.log(tempUsers.length); // 3

//four
var names = [];
for (var i = 0, len = tempUsers.length; i < len; i++) {
  names.push(tempUsers[i].name);
}
console.log(names); // ["ID", "BJ", "JM"]
