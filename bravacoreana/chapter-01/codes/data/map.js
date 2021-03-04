function map(list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]));
    // new_list에 무엇을 push 할 지 iteratee 함수에게 위임했다
  }
  return new_list;
}

module.exports = map;
