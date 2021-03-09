_.map = function (list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i], i, list));
  }
  return new_list;
};

_.filter = function (list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i], i, list)) new_list.push(list[i]);
  }
  return new_list;
};

_.find = function (list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i], i, list)) return list[i];
  }
};

_.findIndex = function (list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i], i, list)) return i;
  }
  return -1;
};

// 코드 1-30 : 1-29 잠깐 빌려쓰려고 했는데 _ 에서 막혔다.

console.log(
  _.filter([1, 2, 3, 4], function (val, idx) {
    return idx > 1;
  })
);
