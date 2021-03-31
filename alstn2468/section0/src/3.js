const log = require('../../lib/log');

// 일급 함수
// - 함수가 값으로 다뤄질 수 있다.

// 고차 함수
// - 함수를 값으로 다루는 함수

// 함수를 인자로 받아서 실행하는 함수
// - apply1
// - times

const apply1 = (f) => f(1); // 함수를 인자로 받아 함수에 1을 적용하는 함수
const add2 = (a) => a + 2; // a를 받아 a에 2를 더하는 함수
log(apply1(add2)); // add2 함수를 인자로 전달해 평가 -> 3
log(apply1((a) => a - 1)); // a를 받아 1를 빼는 함수를 전달해 평가 -> 0

// 함수와 숫자를 받아 숫자 만큼 함수를 실행하는 함수
// 함수를 인자로 받아 원하는 인자를 적용해 함수를 실행한다.
// applicative programming이라고 한다.
const times = (f, n) => {
  let i = -1;
  while (++i < n) f(i);
};

times(log, 3);
// 0
// 1
// 2
times((a) => log(a + 10), 3);
// 10
// 11
// 12

// 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하는 함수)
// - addMaker

// a를 받아 b를 받는 함수를 반환하는 함수
const addMaker = (a) => (b) => a + b;
const add10 = addMaker(10); // a인자로 10이 전달되어 10을 더하는 함수가 반환
log(add10); // 함수가 반환 -> ƒ (b) { return a + b; }
log(add10(5)); // 반환된 함수에 인자로 5를 전달해 15를 반환 -> 15
log(add10(10)); // 반환된 함수에 인자로 10를 전달해 20를 반환 -> 20

// addMaker 함수는 클로저를 만들어 반환한다.
// add10 함수는 함수가 만들어 질때의 환경을 기억한다.
// (b) => a + b 함수는 addMaker 함수가 실행되었을 때의 a를 기억한다.
