// 코드 2-24. 괄호 없이

function f1() {
  return (function (a) {
    console.log(a);
  })(1);
}

f1(); // 1
