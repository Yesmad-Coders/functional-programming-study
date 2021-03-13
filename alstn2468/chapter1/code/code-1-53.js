function add(a, b) {
  return a + b;
}
var add10 = add.bind(null, 10);
add10(20); // 30
