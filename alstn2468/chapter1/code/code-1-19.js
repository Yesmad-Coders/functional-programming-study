const findByName = require('./common/findByName');
const users = require('./common/users');

console.log(findByName(users, 'BJ')); // { id: 3, name: "BJ", age: 32 }
console.log(findByName(users, 'JE')); // { id: 5, name: "JE", age: 27 }
