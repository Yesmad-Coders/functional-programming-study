
function f6() {
  var a = 10;
  function f7(b) {
    return a + b;
  }
  return f7;
}

var f8 = f6();

console.log(f6()(10)); // 10
console.log(f6(10)()); // 
console.log(f8(10)); // 20