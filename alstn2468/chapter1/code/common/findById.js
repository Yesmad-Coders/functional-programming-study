function findById(list, id) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].id == id) return list[i];
  }
}

module.exports = findById;
