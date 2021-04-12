import 'regenerator-runtime/runtime';
import log from '../../lib/log';

// L.map
// 평가를 미루는 성질을 갖는 이터레이터를 반환하는 제너레이터
const L = {};
L.map = function* (f, iter) {
  for (const a of iter) yield f(a);
};

// L.map을 사용하는 것 만으로는 평가되지 않는다.
let iter1 = L.map((a) => a + 10, [1, 2, 3]);
log(iter1.next()); // {value: 11, done: false}
log(iter1.next()); // {value: 12, done: false}
log(iter1.next()); // {value: 13, done: false}
log(iter1.next()); // {value: undefined, done: true}

let iter2 = L.map((a) => a + 10, [1, 2, 3]);
log([...iter2]); // [11, 12, 13]
