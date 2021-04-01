var _ = {};
_ = require('./common/underscore');
_.some = function (list) {
  return !!_.find(list, _.identity);
};
_.every = function (list) {
  return _.filter(list, _.identity).length == list.length;
};
console.log(_.some([0, null, 2])); // true
console.log(_.some([0, null, false])); // false

console.log(_.every([0, null, 2])); // false
console.log(_.every([{}, true, 2])); // true
