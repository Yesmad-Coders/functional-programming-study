function positive(list) {
  return _.find(list, _.identity);
}

function negativeIndex(list) {
  return _.findIndex(list, not);
}

module.exports = { positive, negativeIndex };
