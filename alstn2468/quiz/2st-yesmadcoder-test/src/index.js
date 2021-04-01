const testObj = {
  testValue: 'testValue',
  testFunc(param) {
    console.log(param, this);
  },
  testArrowFunc: () => {
    console.log('arrow');
    console.log(this);
  },
};

// case 1
testObj.testFunc('case1');

// case 2
const test = testObj;
test.testFunc('case2');

// case 3
const testFunc = test.testFunc;
testFunc('case3');

// case 4
document.querySelector('#button').addEventListener('click', testObj.testFunc);

// case 5
window.addEventListener('DOMContentLoaded', testObj.testFunc);

// case 6
window.addEventListener('DOMContentLoaded', testObj.testFunc.bind(testObj));

// case 7
document
  .querySelector('#button2')
  .addEventListener('click', testObj.testArrowFunc);
