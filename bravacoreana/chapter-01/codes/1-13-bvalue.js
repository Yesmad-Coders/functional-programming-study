// 코드 1-13. 함수를 리턴하는 함수 bvalue
// 코드 1-1. addMaker
function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

function bvalue(key) {
  return function (obj) {
    return obj[key];
  };
}

bvalue("a")({ a: "hi", b: "hello" }); // hi

console.log(bvalue("a")({ a: "hi", b: "hello" })); // hi
