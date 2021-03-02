const users = require('./common/users');
const findIndex = require('./common/findIndex');
const { bmatch } = require('./common/bmatch');

console.log(findIndex(users, bmatch({ name: 'JM', age: 32 }))); // 5
console.log(findIndex(users, bmatch({ age: 36 }))); // -1
