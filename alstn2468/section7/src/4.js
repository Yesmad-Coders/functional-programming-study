import 'regenerator-runtime/runtime';
import L from '../../lib/L';
import log from '../../lib/log';
import { curry, pipe, filter, map, reduce, go, take } from '../../lib/fx';

// take, find
// join 함수는 reduce를 이용해 결과를 만드는 함수
const join = curry((sep = ',', iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter)
);

const entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

// queryStr 함수는 reduce를 이용해 결과를 만드는 함수
const queryStr = pipe(
  entries,
  map(([key, value]) => `${key}=${value}`),
  join('&')
);

const users = [
  { age: 32 },
  { age: 31 },
  { age: 37 },
  { age: 28 },
  { age: 25 },
  { age: 32 },
  { age: 31 },
  { age: 37 },
];

// find함수는 조건에 맞는 첫번째 값을 반환하는 함수
// 아래의 find 함수는 하나의 값을 뽑지만 배열의 모든 원소를 순회한다.
// filter에서 L.filter로 변경하면 모든 원소를 순회하지 않고 하나의 결과가 나오면 종료된다.
const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));
log(find((u) => u.age < 30)(users)); // {age: 28}
log(find((u) => u.age < 30, users)); // {age: 28}

go(
  users,
  L.map((u) => u.age),
  find((n) => n < 30),
  log
); // 28
