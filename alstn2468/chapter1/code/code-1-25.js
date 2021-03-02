const users = require('./common/users');
const find = require('./common/find');
const bmatch1 = require('./common/bmatch1');

console.log(find(users, bmatch1('id', 1))); //{ id: 1, name: "ID", age: 32 }
console.log(find(users, bmatch1('name', 'HI'))); // { id: 7, name: "HI", age: 24 }
console.log(find(users, bmatch1('age', 27))); // { id: 5, name: "JE", age: 27 }
