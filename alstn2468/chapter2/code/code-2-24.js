function f1() {
  return (function (a) {
    console.log(a); // 1
  })(1);
}
f1();
