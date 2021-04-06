import 'regenerator-runtime/runtime';
import log from '../../lib/log';

// 이터러블 프로토콜을 따른 map의 다형성 2

/**
 * [map 함수]
 * @template T, U
 * @param {function} f       [위임할 보조함수]
 * @param {Iterable<T>} iter [이터레이터]
 * @returns {Iterable<U>}
 */
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

// 이터러블 프로토콜을 따르는 Map에도 사용할 수 있다.
let m = new Map();
m.set('a', 10);
m.set('b', 20);
const it = m[Symbol.iterator]();
log(it.next()); // {value: Array(2), done: false}
log(it.next()); // {value: Array(2), done: false}
log(it.next()); // {value: undefined, done: true}

// map 함수로 반환된 배열을 이용해 다시 Map 객체를 생성할 수 있다.
log(new Map(map(([k, a]) => [k, a * 2], m))); // Map(2) {"a" => 20, "b" => 40}
