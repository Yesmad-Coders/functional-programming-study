function f1() {
  return function () {};
}

f1();
console.log(f1()); //[Function (anonymous)]
