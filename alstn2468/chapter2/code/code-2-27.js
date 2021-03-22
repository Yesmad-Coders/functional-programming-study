var a = function (a) {
  console.log(this, a); // [1], 1
}.call([1], 1);
