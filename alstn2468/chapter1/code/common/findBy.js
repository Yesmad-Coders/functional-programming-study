function findBy(key, list, val) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i][key] == val) return list[i];
  }
}

module.exports = findBy;
