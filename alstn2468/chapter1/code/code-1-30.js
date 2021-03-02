const _ = require('./common/underscore');

console.log(
  _.filter([1, 2, 3, 4], function (val, idx) {
    return idx > 1;
  })
); // [3, 4]
console.log(
  _.filter([1, 2, 3, 4], function (val, idx) {
    return idx % 2 == 0;
  })
); // [1, 3]
