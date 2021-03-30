const _ = require('./common/underscore');

console.log(_.filter([true, 0, 10, 'a', false, null], _.identity));
// [true, 10, 'a']
