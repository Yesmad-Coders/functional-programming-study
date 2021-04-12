import 'regenerator-runtime/runtime';
import log from '../../lib/log';
import { go, reduce, map, curry } from '../../lib/fx';

// L.filter
const L = {};
L.filter = function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
};

// f(a)가 true인 경우만 yield가 된다.
let iter1 = L.filter((a) => a % 2, [1, 2, 3, 4]);
log(iter1.next()); // {value: 1, done: false}
log(iter1.next()); // {value: 3, done: false}
log(iter1.next()); // {value: undefined, done: true}

let iter2 = L.filter((a) => a % 2, [1, 2, 3, 4]);
log([...iter2]); // [1, 3]
