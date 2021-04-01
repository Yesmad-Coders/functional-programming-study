import 'regenerator-runtime/runtime';
import log from '../../lib/log';

// odds

function* odds1() {
  // odds1은 직접 yield를 입력해주어야 홀수를 생성할 수 있다.
  yield 1;
  yield 3;
  yield 5;
}

let iter = odds1();
log(iter.next()); // {value: 1, done: false}
log(iter.next()); // {value: 3, done: false}
log(iter.next()); // {value: 5, done: false}
log(iter.next()); // {value: undefined, done: true}

function* odds2(limit) {
  for (let i = 0; i < limit; i++) {
    // 문장(로직)으로 제너레이터가 값을 반환하는 로직을 제어할 수 있다.
    if (i % 2) yield i;
  }
}
let iter2 = odds2(10);
log(iter2.next()); // {value: 1, done: false}
log(iter2.next()); // {value: 3, done: false}
log(iter2.next()); // {value: 5, done: false}
log(iter2.next()); // {value: 7, done: false}
log(iter2.next()); // {value: 9, done: false}
log(iter2.next()); // {value: undefined, done: true}

// 전달받은 i를 시작으로 무한히 값을 생성하는 제너레이터
function* infinity(i = 0) {
  while (true) yield i++;
}
// infinity 제너레이터로 생성한 이터레이터는 무한히 값을 생성한다.
let iter3 = infinity();
log(iter3.next()); // {value: 0, done: false}
log(iter3.next()); // {value: 1, done: false}
log(iter3.next()); // {value: 2, done: false}
log(iter3.next()); // {value: 3, done: false}
log(iter3.next()); // {value: 4, done: false}

// infinity 제너레이터를 이용해 홀수를 반환하는 제너레이터를 구현
function* odds3(l) {
  for (const a of infinity(1)) {
    if (a % 2) yield a;
    if (a == l) return;
  }
}
let iter4 = odds3(10);
log(iter4.next()); // {value: 1, done: false}
log(iter4.next()); // {value: 3, done: false}
log(iter4.next()); // {value: 5, done: false}
log(iter4.next()); // {value: 7, done: false}
log(iter4.next()); // {value: 9, done: false}
log(iter4.next()); // {value: undefined, done: true}

// 이터러블을 받아 이터러블의 값이 받은 l과 같아지면 종료
function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a == l) return;
  }
}
let iter5 = limit(4, [1, 2, 3, 4, 5, 6]);
log(iter5.next()); // {value: 1, done: false}
log(iter5.next()); // {value: 2, done: false}
log(iter5.next()); // {value: 3, done: false}
log(iter5.next()); // {value: 4, done: false}
log(iter5.next()); // {value: undefined, done: true}

// 구현한 limit과 infinity 제너레이터를 이용해 홀수를 반환하는 제너레이터
function* odds4(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}
let iter6 = odds4(10);
log(iter6.next()); // {value: 1, done: false}
log(iter6.next()); // {value: 3, done: false}
log(iter6.next()); // {value: 5, done: false}
log(iter6.next()); // {value: 7, done: false}
log(iter6.next()); // {value: 9, done: false}
log(iter6.next()); // {value: undefined, done: true}

// 동일하게 for-of 구문을 사용해 순회할 수 있다.
for (const a of odds4(40)) log(a);
// 1
// 3
// 5
// ...
// 39
