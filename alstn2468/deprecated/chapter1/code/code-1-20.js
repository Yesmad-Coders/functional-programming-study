const findByAge = require('./common/findByAge');
const users = require('./common/users');

console.log(findByAge(users, 28)); // { id: 4, name: "PJ", age: 28 }
console.log(findByAge(users, 25)); // { id: 2, name: "HA", age: 25 }
