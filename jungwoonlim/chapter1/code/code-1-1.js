// 코드 1-1 addMaker
function addMaker(a) {
  // 함수를 리턴한다.
  return function (b) {
    return a + b;
  };
}

addMaker(10)(5);

// addMaker(10)의 결과는 function(b) { return 10 + b; }와 같고 함수다.
// (function(b) { return 10 + b; })(5)와 같으므로 15가 된다.
