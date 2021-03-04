// 클로저가 "있었다".
// f4가 실행되는 사이에만 생겼다가 사라진다.

function f4() {
  var a = 10;
  var b = 20;
  function f5() {
    return a + b;
  }
  return f5();
}
f4(); // 30
