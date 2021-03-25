const _ = require('../../chapter1/code/lib/underscore');
function L2(str) {
  if (L2[str]) return L2[str];
  var splited = str.split('=>');
  return (L2[str] = new Function(splited[0], 'return (' + splited[1] + ')'));
}

console.time('6');
var arr = Array(1000);
_.map(arr, function (v, i) {
  return L2('v, i => i * 2')(v, i);
});
console.timeEnd('6'); // 6: 0.384ms
