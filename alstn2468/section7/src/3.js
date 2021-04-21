import 'regenerator-runtime/runtime';
import log from '../../lib/log';
import { curry, pipe, map, reduce } from '../../lib/fx';

// Array.prototype.join 보다 다형성이 높은 join 함수
const join = curry((sep = ',', iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter)
);

// Object.entries와 다르게 지연성을 갖는 entries함수 또한 만들 수 있다.
const entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

// L.map을 사용해도 join함수는 동일하게 사용할 수 있다.
const queryStr = pipe(
  entries,
  map(([key, value]) => `${key}=${value}`),
  join('&')
);
log(queryStr({ limit: 10, offset: 10, type: 'notice' }));
// limit=10&offset=10&type=notice

function* a() {
  yield 10;
  yield 11;
  yield 12;
  yield 13;
}

// a 함수의 결과는 배열이 아닌 이터레이터지만 join을 사용할 수 있다.
// join 함수에서 이터러블 프로토콜을 따르는 reduce를 사용하므로 사용성이 높다.
log(join(' - ', a())); // 10 - 11 - 12 - 13
