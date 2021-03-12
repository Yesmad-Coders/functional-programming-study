var _ = {
  map: function (list, iteratee) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
      new_list.push(iteratee(list[i], i, list));
    }
    return new_list;
  },

  filter: function (list, predicate) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
      if (predicate(list[i], i, list)) new_list.push(list[i]);
    }
    return new_list;
  },

  find: function (list, predicate) {
    for (var i = 0, len = list.length; i < len; i++) {
      if (predicate(list[i], i, list)) return list[i];
    }
  },

  findIndex: function (list, predicate) {
    for (var i = 0, len = list.length; i < len; i++) {
      if (predicate(list[i], i, list)) return i;
    }
    return -1;
  },
  identity: function (v) {
    return v;
  },
};

// How to export?
module.exports = _;
