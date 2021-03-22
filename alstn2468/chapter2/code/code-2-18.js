function add(a, b) {
  return valid() ? a + b : new Error();

  function valid() {
    return Number.isInteger(a) && Number.isInteger(b);
  }
}

console.log(add(10, 5)); // 15
console.log(add(10, 'a')); // Error
