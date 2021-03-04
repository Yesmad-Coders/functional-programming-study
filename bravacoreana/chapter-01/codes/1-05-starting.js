const users = require("./data/users");

// (1) user 중 나이 30 미만을 모아서 emp_users에 담아 출력한다
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age < 30) temp_users.push(users[i]);
}
console.log(temp_users.length); // 4

// (2) 그들의 나이만 다시 모아 출력한다
var ages = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  ages.push(temp_users[i].age);
}
console.log(ages); // [25,28,27,24]

// (3) 나이 30 이상을 모아서 temp_users에 담아 출력한다
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age >= 30) temp_users.push(users[i]);
}
console.log(temp_users.length); // 3

// (4) 그들의 이름만 다시 모아 출력한다
var names = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  names.push(temp_users[i].name);
}
console.log(names); // ['ID','BJ','JM']

