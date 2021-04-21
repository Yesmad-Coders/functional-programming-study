import 'regenerator-runtime/runtime';
import { reduce } from '../../lib/fx';

// range와 느긋한 L.range 테스트
const range = (l) => {
  let i = -1;
  let result = [];
  while (++i < l) result.push(i);
  return result;
};

const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) yield i;
};

function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

const add = (a, b) => a + b;
test('L.range', 10, () => reduce(add, L.range(1000000))); // L.range: 304.6259765625 ms
test('range', 10, () => reduce(add, range(1000000))); // range: 357.8359375 ms
