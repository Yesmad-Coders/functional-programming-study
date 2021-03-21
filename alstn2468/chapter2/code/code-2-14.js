console.log(add1(10, 5)); // 15
console.log(add2(10, 5)); // TypeError: add2 is not a function

function add1(a, b) {
  return a + b;
}
var add2 = function (a, b) {
  return a + b;
};
