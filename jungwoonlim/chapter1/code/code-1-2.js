// 코드 1-2 addMaker로 만든 함수
const FUNCTIONAL = require("./functional.module.js");

// 5의 값이 들어간 클로저
var add5 = FUNCTIONAL.addMaker(5);
var output3 = add5(3); // 8
var output4 = add5(4); // 9

console.log(output3);
console.log(output4);
