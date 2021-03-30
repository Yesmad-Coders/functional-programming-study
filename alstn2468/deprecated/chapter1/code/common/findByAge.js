function findByAge(list, age) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].age == age) return list[i];
  }
}

module.exports = findByAge;
