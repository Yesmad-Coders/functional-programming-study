!function (a) {
  console.log(a); // 1
}(1);

true && function (a) {
  console.log(a); //1
}(1);

1 ? function (a) {
  console.log(a); // 1
}(1) : 5;

var b = function (a) {
  console.log(a); // 1
}(1);

function f2() {}
f2(function (a) {
  console.log(a); // 1
}(1));

var f3 = function c(a) {
  console.log(a); // 1
}(1);

new function() {
  console.log(1);
}