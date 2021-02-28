function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

var add5 = addMaker(5);
add5(3); // 8
add5(4); // 9

var add3 = addMaker(3);
add3(3); // 6
add3(4); //7
