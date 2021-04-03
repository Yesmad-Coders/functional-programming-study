const _ = require("./data/underscore");

_.identity = function (v) {
  return v;
};
var a = 10;
console.log(_.identity(a)); // 10
