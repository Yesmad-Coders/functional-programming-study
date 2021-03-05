function f1() {}
var a = typeof f1 == 'function' ? f1 : function () {};

function f2() {
  return function () {};
}

(function (a, b) {
  return a + b;
})(10, 5);

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
