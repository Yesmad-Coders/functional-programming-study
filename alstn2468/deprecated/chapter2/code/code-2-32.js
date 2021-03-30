const _ = require('../../chapter1/code/lib/underscore');
function L(str) {
  var splited = str.split('=>');
  return new Function(splited[0], 'return (' + splited[1] + ')');
}

console.time('3');
var arr = Array(10000);
_.map(arr, eval("L('v, i => i * 2')"));
console.timeEnd('3'); // 3: 1.757ms
