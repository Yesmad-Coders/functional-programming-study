// 코드 1-2 addMaker로 만든 함수
function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

// 5의 값이 들어간 클로저
var add5 = addMaker(5);
add5(3); // 8
add5(4); // 9
