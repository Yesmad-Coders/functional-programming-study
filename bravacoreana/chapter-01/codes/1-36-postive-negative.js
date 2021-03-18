const _ = require("./data/underscore");
const { not, beq } = require("./data/not-beq");

function positive(list) {
  return _.find(list, _.identity);
}

function negativeIndex(list) {
  return _.findIndex(list, not);
}

_.some = function (list) {
  return not(not(positive(list)));
};

_.every = function (list) {
  return beq(-1)(negativeIndex(list));
};

console.log(_.some([0, null, 2])); // true
console.log(_.some([0, null, false])); // false
console.log(_.every([0, null, 2])); // false
console.log(_.every([{}, true, 2])); // true
