const testObj = {
  testValue: "testValue",
  testFunc(param) {
    console.log(param, this);
  },
  testArrowFunc: () => {
    // 화살표 함수에서 this는 자신을 감싼 정적 범위lexical context입니다.
    // 전역 코드에서는 전역 객체를 가리킵니다.
    console.log("arrow");
    console.log(this);
  }
};

// case 1
testObj.testFunc("case1");
// testObj

// case 2
const test = testObj;
test.testFunc("case2");
// testObj

// case 3
const testFunc = test.testFunc;
testFunc("case3");
// window


// case 4
document.querySelector("#button").addEventListener("click", testObj.testFunc);
// Click Mouse Event 출력 // window


// case 5
window.addEventListener("DOMContentLoaded", testObj.testFunc);
//함수를 이벤트 처리기로 사용하면 this는 이벤트를 발사한 요소로 설정됩니다 // windw

// case 6
window.addEventListener("DOMContentLoaded", testObj.testFunc.bind(testObj));
// 새 함수의 this는 호출 방식과 상관없이 영구적으로bind()의 첫 번째 매개변수로 고정됩니다.
// testObj


// case 7
document
  .querySelector("#button")
  .addEventListener("click", testObj.testArrowFunc);
  //console.log("arrow"); // window


//https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this
