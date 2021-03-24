const _ = require('../../chapter1/code/lib/underscore');
function L(str) {
  var splited = str.split('=>');
  return new Function(splited[0], 'return (' + splited[1] + ')');
}

console.time('4');
var arr = Array(10000);
_.map(arr, function (v, i) {
  return (function (v, i) {
    return i * 2;
  })(v, i);
});
console.timeEnd('4'); // 4: 2.649ms

console.time('5');
var arr = Array(10000);
_.map(arr, function (v, i) {
  return L('v, i => i * 2')(v, i);
});
console.timeEnd('5'); // 5: 18.288ms
