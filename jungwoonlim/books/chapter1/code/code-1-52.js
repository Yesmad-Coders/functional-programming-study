const FUNCTIONAL = require("./functional.v2.module.js");

FUNCTIONAL.callWith([1, 2, 3])(function (v) {
  return v * 10;
}, FUNCTIONAL.map); // [10,20,30]

FUNCTIONAL.get;

var callWithUsers = FUNCTIONAL.callWith([
  { id: 2, name: "HA", age: 25 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
]);

callWithUsers(2, FUNCTIONAL.get); // { id: 5, name: "JE", age: 27 }

callWithUsers(function (user) {
  return user.age > 25;
}, FUNCTIONAL.find); // { id: 4, name: "PJ", age: 28 }

callWithUsers(function (user) {
  return user.age > 25;
}, FUNCTIONAL.filter); // [{ id: 4, name: "PJ", age: 28 }
//  { id: 5, name: "JE", age: 27 }];

callWithUsers(function (user) {
  return user.age > 25;
}, FUNCTIONAL.some); // true

callWithUsers(function (user) {
  return user.age > 25;
}, FUNCTIONAL.every); // false
