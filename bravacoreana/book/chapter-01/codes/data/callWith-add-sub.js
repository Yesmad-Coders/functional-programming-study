function callWith(val1) {
  return function (val2, func) {
    return func(val1, val2);
  };
}
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}

module.exports = { callWith, add, sub };
