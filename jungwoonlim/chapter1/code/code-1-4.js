// 코드 1-4 addMaker 다시보기
function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

addMaker(10)(5); // 15

// 5를 더하는 클로저
var add5 = addMaker(5);
add5(3); // 8
add5(4); // 9

// 3을 더하는 클로저
var add3 = addMaker(3);
add3(3); // 6
add3(4); // 7
