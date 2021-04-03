import 'regenerator-runtime/runtime';
import log from '../../lib/log';

// 제너레이터/이터레이터
// - 제너레이터: 이터레이터이자 이터러블을 생성하는 함수
// 일반 함수 선언문과 비슷하나 function*과 같이 선언한다.
// 일반 함수와 다르게 yield 키워드를 이용해 반환한다.
function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 100; // 마지막에는 return을 이용해 값을 반환할 수 있다.
}

// 제너레이터의 실행 결과는 이터레이터다.
let iter = gen();
log(iter.next()); // {value: 1, done: false}
log(iter.next()); // {value: 2, done: false}
log(iter.next()); // {value: 3, done: false}
log(iter.next()); // {value: 100, done: true}

log(iter[Symbol.iterator]); // ƒ [Symbol.iterator]() { [native code] }
log(iter[Symbol.iterator]() == iter); // true
for (const a of gen()) log(a);
// 1
// 2
// 3

// 자바스크립트에서 어떤 값이던 이터러블이면 순회할 수 잇다.
// 제너레이터는 문장을 통해 순회할 수 있는 어따힌 값을 만들 수 있다.
