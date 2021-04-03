const users = require("./data/users");
const filter = require("./data/filter");

// 코드 1-16. filter로 한 명 찾기

console.log(
  filter(users, function (user) {
    return user.id == 3;
  })[0]
); // { id: 3, name: 'BJ', age: 32 }
