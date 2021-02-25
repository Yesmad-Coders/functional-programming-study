function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

addMaker(10)(5); // 15
