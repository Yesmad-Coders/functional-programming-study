function not(v) {
  return !v;
}

function beq(a) {
  return function (b) {
    return a === b;
  };
}

module.exports = { not, beq };
