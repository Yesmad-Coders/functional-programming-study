const _ = require('../../chapter1/code/lib/underscore');
function L(str) {
  var splited = str.split('=>');
  return new Function(splited[0], 'return (' + splited[1] + ')');
}

console.time('1');
var arr = Array(10000);
_.map(arr, function (v, i) {
  return i * 2;
});
console.timeEnd('1'); // 1: 1.706ms

console.time('2');
var arr = Array(10000);
_.map(arr, L('v, i => i * 2'));
console.timeEnd('2'); // 2: 2.861ms
