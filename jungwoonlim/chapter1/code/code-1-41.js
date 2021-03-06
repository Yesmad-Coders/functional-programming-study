// f1은 클로저가 아니다.

var a = 10;
var b = 20;
function f1() {
  return a + b;
}
f1(); // 30
