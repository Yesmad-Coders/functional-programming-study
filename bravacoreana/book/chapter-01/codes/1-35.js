const _ = require("./data/underscore");
const { not, beq } = require("./data/not-beq");

_.some = function (list) {
  return !!_.find(list, _.identity);
};

_.every = function (list) {
  return beq(-1)(_.findIndex(list, not));
};

console.log(_.some([0, null, 2])); // true
console.log(_.some([0, null, false])); // false
console.log(_.every([0, null, 2])); // false
console.log(_.every([{}, true, 2])); // true
