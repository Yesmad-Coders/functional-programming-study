// 일급 함수

// one
function f1() {}
var a = typeof f1 == "function" ? f1 : function () {};

// two
function f2() {
  return function () {};
}

// three
(function (a, b) {
  return a + b;
})(10, 5); // 15

// four
function callAndAdd(a, b) {
  return a() + b();
}
callAndAdd(
  function () {
    return 10;
  },
  function () {
    return 5;
  }
); // 15
