function f9() {
  var a = 10;
  var f10 = function (c) {
    return a + b + c;
  };
  var b = 20;
  return f10;
}

var f11 = f9();
console.log(f11(30)); // 60
