// 코드 1-4 addMaker 다시보기
const FUNCTIONAL = require("./functional.module.js");

FUNCTIONAL.addMaker(10)(5); // 15

// 5를 더하는 클로저
var add5 = FUNCTIONAL.addMaker(5);
var output3_1 = add5(3); // 8
var output4_1 = add5(4); // 9
console.log(output3_1);
console.log(output4_1);

// 3을 더하는 클로저
var add3 = FUNCTIONAL.addMaker(3);
var output3_2 = add3(3); // 6
var output4_2 = add3(4); // 7
console.log(output3_2);
console.log(output4_2);
