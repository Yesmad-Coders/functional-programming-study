const users = require('./common/users');
const find = require('./common/find');
const { match, bmatch } = require('./common/bmatch');

console.log(
  match(find(users, bmatch('id', 3)), find(users, bmatch('name', 'BJ')))
); // true
console.log(
  find(users, function (u) {
    return u.age == 32 && u.name == 'JM';
  })
); // { id: 6, name: "JM", age: 32 }
console.log(find(users, bmatch({ name: 'JM', age: 32 })));
// { id: 6, name: "JM", age: 32 }
