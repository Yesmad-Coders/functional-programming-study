function findByName(list, name) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].name == name) return list[i];
  }
}

module.exports = findByName;
