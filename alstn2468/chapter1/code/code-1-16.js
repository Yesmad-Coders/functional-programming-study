const filter = require('./common/filter');
const users = require('./common/users');

console.log(
  filter(users, function (user) {
    return user.id === 3;
  })
)[0]; // { id: 3, name: "BJ", age: 32 }
