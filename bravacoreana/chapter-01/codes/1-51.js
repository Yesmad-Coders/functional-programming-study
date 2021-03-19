const { callWith, add, sub } = require("./data/callWith-add-sub");

console.log(callWith(30)(20, add)); //50
console.log(callWith(20)(20, sub)); //0
