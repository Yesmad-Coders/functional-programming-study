var _ = {};

_.compose = function () {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);

    while (i--) result = args[i].call(this, result);

    return result;
  };
};

_.add = function add(a, b) {
  return a + b;
};

_.sub = function sub(a, b) {
  return a - b;
};

_.get = function (list, idx) {
  return list(idx);
};

_.callWith = function callWith(val1) {
  return function (val2, func) {
    return func(val1, val2);
  };
};

_.contant = function constant(val) {
  return function () {
    return val;
  };
};

_.map = function (list, iteratee) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    newList.push(iteratee(list[i], i, list));
  }
  return newList;
};

_.filter = function (list, predicate) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i], i, list)) newList.push(list[i]);
  }
  return newList;
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

_.identity = function (v) {
  return v;
};

_.not = function not(v) {
  return !v;
};

_.beq = function beq(a) {
  return function (b) {
    return a === b;
  };
};

_.some = _.compose(_.not, _.not, _.positive);
_.every = _.compose(_.beq(-1), _.negativeIndex);

_.positive = function positive(list) {
  return _.find(list, _.identity);
};

_.negativeIndex = function negativeIndex(list) {
  return _.findIndex(list, _.not);
};

//////////////////////////////////////////////////////////////////////

module.exports = _;
