var _ = require('./common/underscore');

var greet = function (name) {
  return 'hi: ' + name;
};
var exclaim = function (statement) {
  return statement.toUpperCase() + '!';
};
var welcome = _.compose(greet, exclaim);
console.log(welcome('moe')); // hi: MOE!
