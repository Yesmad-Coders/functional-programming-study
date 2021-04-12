import 'regenerator-runtime/runtime';
import log from '../../lib/log';
import { go, reduce, curry } from '../../lib/fx';

// take
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

const add = (a, b) => a + b;

// iter에서 l개만큼 값을 잘라 반환하는 함수
const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});

// range를 사용할 경우 100000개의 값을 모두 생성한 후 5개를 뽑는다.
console.time('range');
log(take(5, range(100000))); // [0, 1, 2, 3, 4]
console.timeEnd('range'); // range: 3.97412109375 ms

// L.range는 100000개의 값을 모두 만들지 않고 5개만 생성한다.
console.time('L.range');
log(take(5, L.range(100000))); // [0, 1, 2, 3, 4]
console.timeEnd('L.range'); // L.range: 0.57177734375 ms

// take함수에 curry를 적용해 사용할 수 있다.
go(range(100000), take(5), reduce(add), log); // 10
go(L.range(100000), take(5), reduce(add), log); // 10

// 모든 값을 생성하지 않기 때문에 Infinity를 넣어도 괜찮다.
go(L.range(Infinity), take(5), reduce(add), log); // 10
