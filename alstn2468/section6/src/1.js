import 'regenerator-runtime/runtime';
import log from '../../lib/log';
import { reduce } from '../../lib/fx';

// range와 느긋한 L.range
// l을 받아 0부터 l-1까지 값을 갖는 배열을 반환하는 함수
const range = (l) => {
  let i = -1;
  let result = [];
  while (++i < l) result.push(i);
  return result;
};

log(range(5)); // [0, 1, 2, 3, 4]
log(range(2)); // [0, 1]

const add = (a, b) => a + b;
let list = range(4);
log(reduce(add, list)); // 6

// 느긋한 range
const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) yield i;
};
let list2 = L.range(4);

// L.range로 만든 list2는 이터레이터를 반환하였다.
// range는 함수 호출시 함수의 모든 부분이 평가가 되어 값이 만들어 진다.
// L.range는 이터레이터를 순회하기 전까지 함수 내부에서 어떤 값도 평가되지 않는다.
log(list2); // L.range {<suspended>}
log(reduce(add, list2)); // 6
