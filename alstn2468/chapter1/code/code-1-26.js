const users = require('./common/users');
const filter = require('./common/filter');
const map = require('./common/map');
const bmatch1 = require('./common/bmatch1');

console.log(filter(users, bmatch1('age', 32)));
// [{ id: 1, name: 'ID', age: 32 },
// { id: 3, name: 'BJ', age: 32 },
// { id: 6, name: 'JM', age: 32 }]
console.log(map(users, bmatch1('age', 32)));
// [true, false, true, false, false, true, false]
