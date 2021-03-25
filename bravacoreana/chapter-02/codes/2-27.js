var a = function (a) {
  console.log(this, a);
}.call([1], 1); // [ 1 ] 1
