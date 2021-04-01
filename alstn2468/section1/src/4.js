import log from '../../lib/log';

// 전개연산자 역시 이터러블/이터레이터 프로토콜을 따른다.
// 이터러블/이터레이터 프로토콜을 따르는 모든 것은 전개연산자 사용이 가능하다.
const a = [1, 2];
log(...a); // 1 2
log([...a, ...[3, 4]]); // [1, 2, 3, 4]

a[Symbol.iterator] = null;
log([...a, ...[3, 4]]); // a is not iterable

const set = new Set([1, 2, 3]);
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

log([...a, ...set, ...map]); // [1, 2, 1, 2, 3, Array(2), Array(2), Array(2)]
log([...a, ...set, ...map.values()]); // [1, 2, 1, 2, 3, 1, 2, 3]
log([...a, ...set, ...map.keys()]); // [1, 2, 1, 2, 3, 'a', 'b', 'c']
