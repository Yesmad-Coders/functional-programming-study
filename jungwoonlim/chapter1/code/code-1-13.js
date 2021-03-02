// 코드 1-13 함수를 리턴하는 함수 bvalue
const FUNCTIONAL = require("./functional.module.js");

var output = FUNCTIONAL.bvalue("a")({ a: "hi", b: "hello" }); // hi

console.log(output);
