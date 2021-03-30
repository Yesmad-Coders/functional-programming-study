function L(str) {
  var splited = str.split('=>');
  return new Function(splited[0], 'return (' + splited[1] + ')');
}

console.time('익명 함수');
for (var i = 0; i < 10000; i++) {
  (function (v) {
    return v;
  })(i);
}
console.timeEnd('익명 함수'); // 익명 함수: 1.811ms

console.time('new Function');
for (var i = 0; i < 10000; i++) {
  L('v => v')(i);
}
console.timeEnd('new Function'); // new Function: 15.273ms
