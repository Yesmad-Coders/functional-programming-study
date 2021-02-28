const users = require('./common/users');

var user;
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].id == 3) {
    user = users[i];
    break;
  }
}
console.log(user); // { id: 3, name: "BJ", age: 32 }
