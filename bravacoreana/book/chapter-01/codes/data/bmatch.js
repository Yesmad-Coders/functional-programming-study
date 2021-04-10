function object(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
}

function match(obj, obj2) {
  for (var key in obj2) {
    if (obj[key] !== obj2[key]) return false;
  }
  return true;
}

function bmatch(obj2, val) {
  if (arguments.length == 2) obj2 = object(obj2, val);
  return function (obj) {
    return match(obj, obj2);
  };
}

module.exports = { object, match, bmatch };

// do i have to export object too?
