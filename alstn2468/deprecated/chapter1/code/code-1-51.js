function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function callWith(val1) {
  return function (val2, func) {
    return func(val1, val2);
  };
}
console.log(callWith(30)(20, add)); // 50
console.log(callWith(20)(20, sub)); // 0
