import 'regenerator-runtime/runtime';
import L from '../../lib/L';
import log from '../../lib/log';
import { go, map, filter, take, range } from '../../lib/fx';

console.time('');
go(
  range(10000),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(10),
  log
);
console.timeEnd(''); // : 5.348876953125 ms

// take의 수만큼만 함수들이 평가된다.
console.time('L');
go(
  L.range(10000),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  take(10),
  log
);
console.timeEnd('L'); // L: 0.4248046875 ms
