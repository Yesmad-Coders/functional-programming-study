// underscore.js 중
const _ = require("./data/underscore");

_.compose = function () {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
};

var greet = function (name) {
  return "hi:" + name;
};

var exclaim = function (statement) {
  return statement.toUpperCase() + "!";
};

var welcome = _.compose(greet, exclaim);

console.log(welcome("moe"));
