// 에러 확인용 코드
add1(10, 5); // 15
add2(10, 5); // Uncaught TypeError: add2 is not a function(...) (anonymous function)

function add1(a, b) {
  return a + b;
}

var add2 = function (a, b) {
  return a + b;
};
