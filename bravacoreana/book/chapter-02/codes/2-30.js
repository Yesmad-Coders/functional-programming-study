function L(str) {
  var splitted = str.split("=>");
  return new Function(splitted[0], "return (" + splitted[1] + ");");
}

console.time("익명함수");
for (var i = 0; i < 10000; i++) {
  (function (v) {
    return v;
  })(i);
}
console.timeEnd("익명함수");

console.time("new Function");
for (var i = 0; i < 10000; i++) {
  L("v=>v")(i);
}
console.timeEnd("new Function");

// 익명함수: 0.557ms
// new Function: 10.573ms
