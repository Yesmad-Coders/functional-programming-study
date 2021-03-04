// 코드 1-3 값으로서의 함수

var v1 = 100;
var v2 = function () {}; // 변수에 함수를 담고 있다
function f1() {
  return 100;
}
function f2() {
  return function () {};
} // f2 함수가 또 다른 함수를 리턴한다

console.log(v1); // 100
console.log(v2); // [Function: v2]
console.log(f1()); // 100
console.log(f2()); // [Function (anonymous)]
