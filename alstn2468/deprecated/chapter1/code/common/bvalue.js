function bvalue(key) {
  return function (obj) {
    return obj[key];
  };
}

module.exports = bvalue;
