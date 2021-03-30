function constant(val) {
  return function () {
    return val;
  };
}
var always10 = constant(10);
console.log(always10()); // 10;
console.log(always10()); // 10;
console.log(always10()); // 10;
