console.log(add1); // [Function: add1]
console.log(add2); // undefined

function add1(a, b) {
  return a + b;
}
var add2 = function (a, b) {
  return a + b;
};
