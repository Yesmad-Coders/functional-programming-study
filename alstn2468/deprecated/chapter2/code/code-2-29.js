function L(str) {
  var splited = str.split('=>');
  return new Function(splited[0], 'return (' + splited[1] + ')');
}

console.log(L('n => n * 10')(10)); // 100
console.log(L('n => n * 10')(20)); // 200
console.log(L('n => n * 10')(30)); // 300
console.log(L('a, b => a + b')(10, 20)); // 30
console.log(L('a, b => a + b')(10, 5)); // 15
