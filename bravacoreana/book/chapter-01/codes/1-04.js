// 코드 1-4. addMaker 다시보기

function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

var add5 = addMaker(5); //15
add5(3); // 8
add5(4); // 9

var add3 = addMaker(3);
add3(3); // 6
add3(4); // 7

console.log(add5); // [Function (anonymous)]
console.log(add5(3)); // 8
console.log(add5(4)); // 9
console.log(add3); // [Function (anonymous)]
console.log(add3(3)); // 6
console.log(add3(4)); // 7
