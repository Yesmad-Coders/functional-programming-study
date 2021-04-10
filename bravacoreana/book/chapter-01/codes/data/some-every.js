_.some = function (list) {
  return !!_.find(list, _.identity);
};

_.every = function (list) {
  return beq(-1)(_.findIndex(list, not));
};
