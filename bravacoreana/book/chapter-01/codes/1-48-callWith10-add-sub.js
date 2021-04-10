function callWith10(val, func) {
  return func(10, val);
}
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
console.log(callWith10(20, add)); // 30
console.log(callWith10(5, sub)); // 5
