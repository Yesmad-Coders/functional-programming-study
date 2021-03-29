function L(str) {
  var splited = str.split('=>');
  return new Function(splited[0], 'return (' + splited[1] + ')');
}

function L2(str) {
  if (L2[str]) return L2[str];
  var splited = str.split('=>');
  return (L2[str] = new Function(splited[0], 'return (' + splited[1] + ')'));
}
