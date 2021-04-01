const log = require('../../lib/log');

// 평가 (Evaluation)
// - 코드가 계산 되어 값을 만다는 것

log(1); // 1로 평가
log(1 + 2); // 3으로 평가
log(1 + 2 + 4); // 7로 평가
log(3 + 4); // 7로 평가
log([1, 2]); // [1, 2]로 평가
log([1, 5]); // [1, 5]로 평가
log([1, 2 + 3]); // [1, 5]로 평가
log([1, 2, [3, 4]]); // [1, 2, [3, 4]]로 평가
log([1, 2, ...[3, 4]]); // [1, 2, 3, 4]로 평가

// 일급 (First class)
// - 값으로 다룰 수 있다.
// - 변수에 담을 수 있다.
// - 함수의 인자로 사용될 수 있다.
// - 함수의 결과로 사용될 수 있다.

const a = 10; // 값으로 다룰 수 있어 변수에 담을 수 있다.
const add10 = (a) => a + 10;
log(add10(a)); // add10이라는 함수에 a로 인자로 전달할 수 있다.
const r = add10(a);
log(r); // 함수의 결과값은 다시 변수에 담을 수 있다.
